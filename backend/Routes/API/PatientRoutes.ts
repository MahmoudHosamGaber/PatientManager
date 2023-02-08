import express, { Router } from "express";
import PatientController from "../../Controller/PatientController";
import authinticateAdmin from "../../Middleware/AuthMiddleware";

export const router = express.Router();
const {
    createPatient,
    validateCreatePatientInput,
    getAllPatients,
    getPatientById,
    updatePatient,
    validateUpdatePatientInput,
    deletePatient,
} = PatientController;

router.post("/", authinticateAdmin, validateCreatePatientInput, createPatient);
router.get("/", authinticateAdmin, getAllPatients);
router.get("/:id", authinticateAdmin, getPatientById);
router.put(
    "/:id",
    authinticateAdmin,
    validateUpdatePatientInput,
    updatePatient
);
router.delete("/:id", authinticateAdmin, deletePatient);
