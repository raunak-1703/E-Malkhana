import Case from '../model/case.js';

export const createCase = async (req,res)=>{
    try {
        const {
      policeStationName,
      investigatingOfficerName,
      investigatingOfficerId,
      crimeNumber,
      crimeYear,
      dateOfFIR,
      dateOfSeizure,
      actAndLaw,
      sections,
    } = req.body;
    
     if (
      !policeStationName ||
      !investigatingOfficerName ||
      !investigatingOfficerId ||
      !crimeNumber ||
      !crimeYear ||
      !dateOfFIR ||
      !dateOfSeizure ||
      !actAndLaw ||
      !sections
    ){
        return res.status(400).json({message:'All fields are required'})
    }

    const newCase = await Case.create({
        policeStationName,
      investigatingOfficerName,
      investigatingOfficerId,
      crimeNumber,
      crimeYear,
      dateOfFIR,
      dateOfSeizure,
      actAndLaw,
      sections,
    })

    res.status(201).json({
        message:'Case Created Successfully',
        case:newCase,
    })
    } catch (error) {
        console.error(error.message)
      res.status(500).json({message:'Server error'})  
    }
}