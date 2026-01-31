import CustodyLog from "../model/custodyLog.js";

export const addCustodyLog = async(req,res)=>{
    try {
        const {propertyId,from,to,purpose,dateTime,remarks} = req.body;

        if (!propertyId || !from || !to || !purpose || !dateTime){
            return res.status(400).json({message:'All required fields must be filled'})
        }

        const log = await CustodyLog.create({
            propertyId,
            from,
            to,
            purpose,
            dateTime,
            remarks,
        })

        res.status(201).json({
            message:'Custody Log added successfully',
            log,
        })
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message:'Server error'})
    }
}

export const getCustodyLogs = async (req,res)=>{
    try {
        const {propertyId} = req.params;
        
        if(!propertyId){
            return res.status(400).json({message:'Property ID is required'})
        }
        const logs = await CustodyLog.find({propertyId}).populate('propertyId').sort({dateTime:1})

        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({message:'Server error'})
    }
}