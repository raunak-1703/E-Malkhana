import Case from "../model/Case.js";

export const getDashboardStats = async (req,res)=>{
    try {
        const totalCases = await Case.countDocuments();
        const pendingCases = await Case.countDocuments({
            status:'PENDING'
        });
        const disposedCases = await Case.countDocuments({
            status:'DISPOSED'
        });

        res.status(200).json({
            totalCases,
            pendingCases,
            disposedCases,
        })
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:'Server error'})
    }
}