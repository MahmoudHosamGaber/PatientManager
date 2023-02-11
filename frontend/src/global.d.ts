export type User = {
    username: string;
    id: string;
    token: string;
} | null;
export type AlertFields = {
    isOpen: boolean;
    severity: "success" | "error";
    message: string;
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

export type AppointmentRecordWithPatient = {
    _id: string;
    title: string;
    description: string;
    date: Date;
    patient: PatientRecord;
    cost: number;
    paid: number;
};
