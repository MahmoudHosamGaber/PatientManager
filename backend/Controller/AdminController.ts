import Admin from "../Model/AdminModel";
import { Request, Response } from "express";
import { AdminUser } from "../global";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AuthinticatedRequest } from "../global";
import { Record, Static } from "runtypes";

export const registerAdmin = async (req: Request, res: Response) => {
    const { username, firstName, lastName, password } = req.body;
    const adminExists = await Admin.find({ username });
    if (adminExists.length > 0)
        return res.status(400).json({ message: "Admin already exists" });
    const passwordHash = await bcrypt.hash(password, 10);
    const admin = new Admin({
        username,
        firstName,
        lastName,
        password: passwordHash,
    });
    await admin.save();
    res.json(admin);
};

const Input = Record({});
type Input = Static<typeof Input>;
export const loginAdmin = async (req: Request<Input>, res: Response) => {
    const { username, password } = req.body;
    const admin: AdminUser | null = await Admin.findOne({ username });
    const isAuthorized =
        admin && (await bcrypt.compare(password, admin.password));
    if (!isAuthorized) {
        return res
            .status(401)
            .json({ message: "Invalid username or password" });
    }
    return res.json({
        _id: admin._id,
        username: admin.username,
        token: generateToken(admin._id),
    });
};

export const changePassword = async (
    req: AuthinticatedRequest,
    res: Response
) => {
    const { password, username, newPassword } = req.body;
    if (!password)
        return res.status(400).json({ message: "Password is required" });
    const admin: AdminUser | null = await Admin.findById(req.user?._id);
    const isAuthorized =
        admin && (await bcrypt.compare(password, admin.password));
    if (!isAuthorized) {
        return res.status(401).json({ message: "Invalid password" });
    }
    if (password) {
        const passwordHash = await bcrypt.hash(newPassword, 10);
        await Admin.findByIdAndUpdate(req.user?._id, {
            password: passwordHash,
        });
    }
    if (username) await Admin.findByIdAndUpdate(req.user?._id, { username });
    res.status(200).json({ message: "Credintials changed successfully" });
};

const generateToken = (id: string) => {
    return jwt.sign({ id }, process.env.SECRET!, { expiresIn: "30d" });
};
