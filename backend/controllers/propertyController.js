import CustodyLog from "../model/custodyLog.js";
import Property from "../model/Property.js";
import QRCode from "qrcode";

export const addProperty = async (req, res) => {
  try {
    const {
      caseId,
      category,
      belongingTo,
      nature,
      quantity,
      location,
      description,
      photoUrl,
    } = req.body;

    if (
      !caseId ||
      !category ||
      !belongingTo ||
      !nature ||
      !quantity ||
      !location ||
      !description
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Generating QR code data
    const qrPayload = {
      type: "E-MALKHANA-PROPERTY",
      category,
      belongingTo,
      nature,
      quantity,
      caseId,
      generatedAt: new Date().toISOString(),
    };

    const qrCode = await QRCode.toDataURL(JSON.stringify(qrPayload));

    const property = await Property.create({
      caseId,
      category,
      belongingTo,
      nature,
      quantity,
      location,
      description,
      photoUrl,
      qrCode,
    });

    // adding a custody Log
    await CustodyLog.create({
      propertyId: property._id,
      from: "Crime Scene",
      to: "Malkhana",
      purpose: "Initial Seizure and Storage",
    });

    res.status(201).json({
      message: "Property added successfully",
      property,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};
