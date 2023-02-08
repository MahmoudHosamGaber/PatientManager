import mongoose, { Schema } from "mongoose";

const PatientSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phonenumber: {
        type: String,
        unique: true,
        required: true,
    },
});

export default mongoose.model("Patient", PatientSchema);
