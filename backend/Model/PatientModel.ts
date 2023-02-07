import mongoose, { Schema } from "mongoose";

const phonenumberRegex = /^01[0125][0-9]{8}$/gm;
const PatientSchema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phonenumber: {
        type: String,
        unique: true,
        required: true,
    },
});

PatientSchema.path("phonenumber").validate((phonenumber: string) => {
    return phonenumberRegex.test(phonenumber);
}, "Invalid phone number");

export default mongoose.model("Patient", PatientSchema);
