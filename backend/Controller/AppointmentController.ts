import { NextFunction, Request, Response } from "express";
import Appointment from "../Model/AppointmentModel";
import { validateInput } from "../Middleware/validateInput";
import { Record, Static, String, Number } from "runtypes";
import PatientModel from "../Model/PatientModel";
import bcrypt from "bcrypt";
import { AuthinticatedRequest } from "../global";

const createAppointmentInput = Record({
    title: String,
    description: String.optional(),
    date: String.optional(),
    patient: String,
    cost: Number.withConstraint((cost) => cost > 0),
    paid: Number,
});
type createPatientInput = Static<typeof createAppointmentInput>;
const validateCreateAppointmentInput = validateInput(createAppointmentInput);
const createAppointment = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { title, description, date, patient, cost, paid } = req.body;
        const appointment = new Appointment({
            title,
            description,
            date,
            patient,
            cost,
            paid,
        });
        if (paid > cost)
            return res.status(400).json({
                message: "Paid amount can't be greater than cost",
            });
        const savedAppointment = await appointment.save();
        res.json(savedAppointment);
    } catch (error) {
        next(error);
    }
};

const getAllAppointments = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const appointments = await Appointment.find();
        res.status(200).json(appointments);
    } catch (error) {
        next(error);
    }
};

const getPendingAppointments = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const appointments = await Appointment.find();
        const pendingAppointments = appointments.filter(
            (appointment) => appointment.paid < appointment.cost
        );
        const pendingAppointmentsWithPatient = await Promise.all(
            pendingAppointments.map(async (appointment) => {
                const patient = await PatientModel.findById(
                    appointment.patient
                );
                return {
                    ...(appointment as any)._doc,
                    patient: patient,
                };
            })
        );
        res.status(200).json(pendingAppointmentsWithPatient);
    } catch (error) {
        next(error);
    }
};

const getAppointmentById = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const id = req.params.id;
        const appointment = await Appointment.findById(id);
        if (!appointment) return res.status(404).json({ message: "Not found" });
        res.status(200).json(appointment);
    } catch (error) {
        next(error);
    }
};

const getAppointmentByPatientId = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const appointments = await Appointment.find();
        const patientAppointments = appointments.filter(
            (appointment) => appointment.patient.toString() === req.params.id
        );
        res.status(200).json(patientAppointments);
    } catch (error) {
        next(error);
    }
};

const updateAppointment = async (
    req: AuthinticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const { title, description, date, cost, paid } = req.body;
        if (!req.user) return res.status(401).json({ message: "Unauthorized" });
        const filter = {
            ...(title ? { title } : {}),
            ...(description ? { description } : {}),
            ...(date ? { date } : {}),
            ...(cost ? { cost } : {}),
            ...(paid ? { paid } : {}),
        };
        const original = await Appointment.findById(req.params.id);
        if (!original)
            return res.status(404).json({ message: "Appointment Not found" });
        if (paid > original.cost)
            return res.status(400).json({
                message: "Paid amount can't be greater than cost",
            });

        const appointment = await Appointment.findByIdAndUpdate(
            req.params.id,
            filter
        );
        if (!appointment) return res.status(404).json({ message: "Not found" });
        res.status(200).json({ ...(appointment as any)._doc, ...filter });
    } catch (error) {
        next(error);
    }
};

const deleteAppointment = async (
    req: AuthinticatedRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) return res.status(404).json({ message: "Not found" });
        else res.status(200).json(appointment);
    } catch (error) {
        next(error);
    }
};

export default {
    createAppointment,
    validateCreateAppointmentInput,
    getAllAppointments,
    getPendingAppointments,
    getAppointmentById,
    getAppointmentByPatientId,
    updateAppointment,
};
