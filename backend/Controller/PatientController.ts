import { NextFunction, Request, Response } from "express";
import { Record, Static, String } from "runtypes";
import { validateInput } from "../Middleware/validateInput";
import Patient from "../Model/PatientModel";

const phonenumberRegex = /^01[0125][0-9]{8}$/m;
const phonenumberConstraint = (phonenumber: string | undefined) => {
    if (!phonenumber) return true;
    return phonenumberRegex.test(phonenumber);
};
const createPatientInput = Record({
    firstName: String,
    lastName: String,
    phonenumber: String.withConstraint(phonenumberConstraint),
});
type createPatientInput = Static<typeof createPatientInput>;
const validateCreatePatientInput = validateInput(createPatientInput);
const createPatient = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { firstName, lastName, phonenumber } = req.body;
        if (!firstName || !lastName || !phonenumber)
            return res.status(400).json({ message: "Missing required fields" });
        const phonenumberExists = await Patient.findOne({ phonenumber });
        if (phonenumberExists) {
            return res
                .status(400)
                .json({ message: "A Patient with this number already exists" });
        }
        const patient = new Patient({
            firstName: firstName.toLowerCase(),
            lastName: lastName.toLowerCase(),
            phonenumber,
        });
        await patient.save();
        res.status(200).json(patient);
    } catch (error) {
        next(error);
    }
};

const getAllPatients = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        next(error);
    }
};

const getPatientById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient)
            return res.status(404).json({ message: "Patient not found" });
        res.status(200).json(patient);
    } catch (error) {
        next(error);
    }
};

const updatePatientInput = Record({
    firstName: String.optional(),
    lastName: String.optional(),
    phonenumber: String.optional().withConstraint(phonenumberConstraint),
});
type updatePatientInput = Static<typeof updatePatientInput>;
const validateUpdatePatientInput = validateInput(updatePatientInput);
const updatePatient = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let { firstName, lastName, phonenumber } = req.body;
        firstName = firstName?.toLowerCase();
        lastName = lastName?.toLowerCase();
        const filter = {
            ...(firstName ? { firstName } : {}),
            ...(lastName ? { lastName } : {}),
            ...(phonenumber ? { phonenumber } : {}),
        };
        if (phonenumber) {
            const phonenumberExists = await Patient.find({
                phonenumber,
            });
            if (phonenumberExists) {
                return res.status(400).json({
                    message: "A Patient with this number already exists",
                });
            }
        }
        const patient = await Patient.findByIdAndUpdate(req.params.id, filter, {
            runValidators: true,
            new: true,
        });
        if (!patient)
            return res.status(404).json({ message: "Patient not found" });
        res.status(200).json({ ...patient, firstName, lastName, phonenumber });
    } catch (error) {
        next(error);
    }
};

const deletePatient = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient)
            return res.status(404).json({ message: "Patient not found" });
        res.status(200).json(patient);
    } catch (error) {
        next(error);
    }
};

const filterPatientInput = Record({
    name: String.optional(),
    phonenumber: String.optional(),
});
type filterPatientInput = Static<typeof filterPatientInput>;
const validateFilterPatientInput = validateInput(filterPatientInput);
const filterPatient = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        let { name, phonenumber } = req.body;
        phonenumber = phonenumber?.trim() || "";
        name = name?.trim() || "";
        let patients = await Patient.find();
        patients = patients.filter((patient) => {
            const fullName =
                patient.firstName.toLowerCase().trim() +
                " " +
                patient.lastName.toLowerCase().trim();
            return (
                fullName.includes(name?.toLowerCase()?.trim()) &&
                patient.phonenumber.includes(phonenumber?.trim())
            );
        });
        res.status(200).json(patients);
    } catch (error) {
        next(error);
    }
};

export default {
    createPatient,
    validateCreatePatientInput,
    getAllPatients,
    getPatientById,
    updatePatient,
    validateUpdatePatientInput,
    deletePatient,
    filterPatient,
    validateFilterPatientInput,
};
