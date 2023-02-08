import express from "express";
import AppointmentController from "../../Controller/AppointmentController";
import authinticateAdmin from "../../Middleware/AuthMiddleware";

export const router = express.Router();
const {
    createAppointment,
    validateCreateAppointmentInput,
    getAllAppointments,
    getAppointmentByPatientId,
    getPendingAppointments,
    updateAppointment,
    deleteAppointment,
} = AppointmentController;

router.get("/", authinticateAdmin, getAllAppointments);
router.get("/pending", authinticateAdmin, getPendingAppointments);
router.get("/:id", authinticateAdmin, getAppointmentByPatientId);
router.post(
    "/",
    authinticateAdmin,
    validateCreateAppointmentInput,
    createAppointment
);
router.put("/:id", authinticateAdmin, updateAppointment);
router.delete("/:id", authinticateAdmin, deleteAppointment);
