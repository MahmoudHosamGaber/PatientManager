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

export type PatientRecord = {
    _id: string;
    firstName: string;
    lastName: string;
    phonenumber: string;
};

export type AppointmentRecord = {
    _id: string;
    title: string;
    description: string;
    date: Date;
    patient: string;
    cost: number;
    paid: number;
};
