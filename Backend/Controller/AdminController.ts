import Admin from "../Model/AdminModel";
import { Request, Response } from "express";
import { AdminUser } from "../global";

export const getAdmins = async (req: Request, res: Response) => {
    const admins: AdminUser[] = await Admin.find();
    res.json(admins);
};
