import Disposal from "../model/Disposal.js";
import Property from "../model/Property.js";
import Case from "../model/Case.js";
import CustodyLog from "../model/custodyLog.js";

export const disposeProperty = async (req, res) => {
  try {
    const {
      propertyId,
      disposalType,
      courtOrderReference,
      remarks,
    } = req.body;

    if (!propertyId || !disposalType || !courtOrderReference) {
      res.status(400).json({ message: "All required fields must be filled" });
    }

    // Creating disposal record
    await Disposal.create({
      propertyId,
      disposalType,
      courtOrderReference,
      remarks,
    });

    // Updating property status
    const property = await Property.findByIdAndUpdate(
      propertyId,
      { status: "DISPOSED" },
      { new: true },
    );
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    // Creating a Disposal Custody Log
    const lastCustody = await CustodyLog.findOne({ propertyId }).sort({
      createdAt: -1,
    });
    await CustodyLog.create({
      propertyId,
      from: lastCustody ? lastCustody.to : "Unknown",
      to: "Court/Disposal Authority",
      purpose: "Disposed as per court order",
      remarks: courtOrderReference,
    });


    // checking if all properties in the case are disposed
    const remaining = await Property.countDocuments({
      caseId: property.caseId,
      status: "IN CUSTODY",
    });

    if (remaining === 0) {
      await Case.findByIdAndUpdate(property.caseId, { status: "Disposed" });
    }
    res.status(200).json({ message: "Property disposed successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};
