import mongoose from "mongoose";
const custodySchema = new mongoose.Schema({
    propertyId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Property',
        reqyured:true,
    },
    from:{
        type:String,
        required:true
    },
    to:{
        type:String,
        required:true
    },
    purpose:{
        type:String,
        required:true,
    },
    dateTime:{
        type:Date,
        required:true,
    },
    remarks:{
        type:String,
    },
},{timestamps:true})

const CustodyLog = mongoose.model('CustodyLog',custodySchema)
export default CustodyLog;