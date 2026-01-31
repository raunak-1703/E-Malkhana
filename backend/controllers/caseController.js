import Case from '../model/Case.js';
import Property from '../model/Property.js';

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

// Controller for searching cases by crime Number and Crime Year
export const searchCases = async (req,res)=>{
    try {
        const {crimeNumber,crimeYear} = req.query;

        let query = {}

        if(crimeNumber) query.crimeNumber = crimeNumber;
        if(crimeYear) query.crimeYear= crimeYear;

        const cases = await Case.find(query).sort({createdAt:-1});

        res.status(200).json(cases);
    } catch (error) {
        console.error(error.message);
        res.status(500).json('Server error');
    }
}

// Controller for getting full info of cases by case Id

export const getCaseById = async (req,res)=>{
    try {
        const {id} = req.params;
        const caseData = await Case.findById(id);

        if(!caseData){
            return res.status(404).json({message:'Case not found'});
        }

        const properties = await Property.find({caseId:id});
        res.status(200).json({case:caseData,properties});
    } catch (error) {
        console.error(error.message);
        res.status(500).json({message:'Server error'});
    }
}