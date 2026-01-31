import mongoose from 'mongoose'

const propertySchema = new mongoose.Schema({
    caseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Case',
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    belongingTo:{
        type:String,
        enum:["accused", "complainant", "unknown"],
        set: v => v.toLowerCase(),
        required:true,
    },
    nature:{
        type:String,
        required:true,
    },
    quantity:{
        type:String,
        required:true,
    },
    location: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    photoUrl: {
      type: String,
    },
    qrCode: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["IN CUSTODY", "DISPOSED"],
      default: "IN CUSTODY",
      set: v => v.toUpperCase()
    },
},{timestamps:true})

const Property = mongoose.model('Property',propertySchema);

export default Property