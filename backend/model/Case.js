import mongoose from "mongoose";

const caseSchema = new mongoose.Schema(
  {
    policeStationName: {
      type: String,
      required: true,
    },
    investigatingOfficerName: {
      type: String,
      required: true,
    },
    investigatingOfficerId: {
      type: String,
      required: true,
    },
    crimeNumber: {
      type: String,
      required: true,
    },
    crimeYear: {
      type: Number,
      required: true,
    },
    dateOfFIR: {
      type: Date,
      required: true,
    },
    dateOfSeizure: {
      type: Date,
      required: true,
    },
    actAndLaw: {
      type: String,
      required: true,
    },
    sections: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "DISPOSED"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

const Case = mongoose.model("Case", caseSchema);

export default Case;
