import mongoose, { Schema } from "mongoose";

const AdminSchema = new Schema({
    username: { type: String, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
});

AdminSchema.index({ username: 1 }, { unique: true });

export default mongoose.model("Admin", AdminSchema);
