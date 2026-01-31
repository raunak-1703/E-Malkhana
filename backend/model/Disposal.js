import mongoose from 'mongoose'

const disposalSchema = new mongoose.Schema({
    propertyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Property',
        required:true,
    },
    disposalType:{
        type:String,
        enum:['Returned', 'Destroyed','Auctioned','Court Custody'],
        required:true,
    },
    courtOrderReference:{
        type:String,
        required:true,
    },
    disposalDate:{
        type:Date,
        required:true,
    },
    remarks:{
        type:String,
    },
},{timestamps:true})

const Disposal = mongoose.model('Disposal',disposalSchema);

export default Disposal