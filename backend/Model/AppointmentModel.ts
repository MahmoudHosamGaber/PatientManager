import mongoose, { Schema } from "mongoose";

const AppointmentSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, default: "" },
    date: { type: Date, required: true, default: Date.now },
    patient: {
        type: Schema.Types.ObjectId,
        ref: "Patient",
        required: true,
    },
    cost: { type: Number, required: true },
    paid: { type: Number, required: true },
});

export default mongoose.model("Appointment", AppointmentSchema);
