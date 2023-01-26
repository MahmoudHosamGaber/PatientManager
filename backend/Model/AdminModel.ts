import mongoose, { Schema } from "mongoose";

const AdminSchema = new Schema({
    username: { type: String, unique: true },
    firstName: String,
    lastName: String,
    password: String,
});

AdminSchema.index({ username: 1 }, { unique: true });

export default mongoose.model("Admin", AdminSchema);
