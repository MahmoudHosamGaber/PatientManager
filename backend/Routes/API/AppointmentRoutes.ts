import express from "express";
import AppointmentController from "../../Controller/AppointmentController";
import authinticateAdmin from "../../Middleware/AuthMiddleware";

export const router = express.Router();
const {
    createAppointment,
    validateCreateAppointmentInput,
    getAllAppointments,
    getAppointmentById,
    getAppointmentByPatientId,
    getPendingAppointments,
    updateAppointment,
} = AppointmentController;

router.get("/", authinticateAdmin, getAllAppointments);
router.get("/pending", authinticateAdmin, getPendingAppointments);
router.get("/patient/:id", authinticateAdmin, getAppointmentByPatientId);
router.post(
    "/",
    authinticateAdmin,
    validateCreateAppointmentInput,
    createAppointment
);
router.get("/:id", authinticateAdmin, getAppointmentById);
router.put("/:id", authinticateAdmin, updateAppointment);
