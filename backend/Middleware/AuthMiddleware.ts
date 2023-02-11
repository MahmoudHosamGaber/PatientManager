import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import Admin from "../Model/AdminModel";
import { AuthinticatedRequest, AdminUser } from "../global";

const authinticateAdmin = asyncHandler(
    async (req: AuthinticatedRequest, res: Response, next: NextFunction) => {
        try {
            if (!req.headers.authorization?.startsWith("Bearer")) {
                res.status(401).json({ message: "Invalid Token" });
                return;
            }
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(
                token,
                process.env.SECRET!
            ) as JwtPayload;
            const admin: AdminUser | null = await Admin.findById(decoded.id);
            if (!admin) {
                res.json({ message: "Invalid Token Unauthorized" });
                return;
            }
            req.user = admin;
            return next();
        } catch (error) {
            next(error);
        }
    }
);

export default authinticateAdmin;
