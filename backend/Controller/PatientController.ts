import { Request, Response } from "express";
import Patient from "../Model/PatientModel";

const createPatient = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, phonenumber } = req.body;
        if (!firstName || !lastName || !phonenumber)
            return res.status(400).json({ message: "Missing required fields" });
        const phonenumberExists = await Patient.findOne({ phonenumber });
        if (phonenumberExists) {
            return res
                .status(400)
                .json({ message: "a Patient with this number already exists" });
        }
        const patient = new Patient({
            firstName,
            lastName,
            phonenumber,
        });
        await patient.save();
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ error });
    }
};

const getAllPatients = async (req: Request, res: Response) => {
    try {
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (error) {
        res.status(500).json({ error });
    }
};

const getPatientById = async (req: Request, res: Response) => {
    try {
        const patient = await Patient.findById(req.params.id);
        if (!patient)
            return res.status(404).json({ message: "Patient not found" });
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ error });
    }
};

const updatePatient = async (req: Request, res: Response) => {
    try {
        const { firstName, lastName, phonenumber } = req.body;
        const filter = {
            ...(firstName ? { firstName } : {}),
            ...(lastName ? { lastName } : {}),
            ...(phonenumber ? { phonenumber } : {}),
        };
        const patient = await Patient.findByIdAndUpdate(req.params.id, filter, {
            runValidators: true,
            new: true,
        });
        if (!patient)
            return res.status(404).json({ message: "Patient not found" });
        res.status(200).json({ ...patient, firstName, lastName, phonenumber });
    } catch (error) {
        res.status(500).json({ error });
    }
};

const deletePatient = async (req: Request, res: Response) => {
    try {
        const patient = await Patient.findByIdAndDelete(req.params.id);
        if (!patient)
            return res.status(404).json({ message: "Patient not found" });
        res.status(200).json(patient);
    } catch (error) {
        res.status(500).json({ error });
    }
};

export default {
    createPatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient,
};
