import express, { Router } from "express";
import PatientController from "../../Controller/PatientController";
import authinticateAdmin from "../../Middleware/AuthMiddleware";

export const router = express.Router();
const {
    createPatient,
    getAllPatients,
    getPatientById,
    updatePatient,
    deletePatient,
} = PatientController;

router.post("/", authinticateAdmin, createPatient);
router.get("/", authinticateAdmin, getAllPatients);
router.get("/:id", authinticateAdmin, getPatientById);
router.put("/:id", authinticateAdmin, updatePatient);
router.delete("/:id", authinticateAdmin, deletePatient);
