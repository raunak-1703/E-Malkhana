import mongoose from 'mongoose'

const disposalSchema = new mongoose.Schema({
    propertyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Property',
        required:true,
    },
    disposalType:{
        type:String,
        enum:['returned', 'destroyed','auctioned','court custody'],
        set: v => v.toLowerCase(),
        required:true,
    },
    courtOrderReference:{
        type:String,
        required:true,
    },
    remarks:{
        type:String,
    },
},{timestamps:true})

const Disposal = mongoose.model('Disposal',disposalSchema);

export default Disposal