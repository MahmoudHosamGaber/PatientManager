import { Request } from "express";
export type AdminUser = {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    password: string;
};
type AuthinticatedRequest = Request & { user?: AdminUser };

export type Cookie = {
    userType: string | null;
};
