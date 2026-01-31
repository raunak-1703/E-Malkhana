import Disposal from "../model/Disposal.js";
import Property from "../model/Property.js";
import Case from "../model/Case.js";

export const disposeProperty = async (req,res)=>{
    try {
        const {
      propertyId,
      disposalType,
      courtOrderReference,
      disposalDate,
      remarks,
    } = req.body;

    if (!propertyId || !disposalType || !courtOrderReference || !disposalDate) {
        res.status(400).json({message:'All required fields must be filled'})
    }

    // Creating disposal record 
    await Disposal.create({
      propertyId,
      disposalType,
      courtOrderReference,
      disposalDate,
      remarks,
    })

    // Updating property status 
    const property = await Property.findByIdAndUpdate(
        propertyId,
        {status:'DISPOSED'},
        {new:true}
    );

    // checking if all properties in the case are disposed
    const remaining = await Property.countDocuments({
        caseId:property.caseId,
        status:'IN_CUSTODY'
    });

    if(remaining===0){
        await Case.findByIdAndUpdate(property.caseId,{status:'Disposed'})
    }
    res.status(200).json({message:'Property disposed successfully'})

    } catch (error) {
        console.error(error.message)
        res.status(500).json({message:'Server error'});
    }
}