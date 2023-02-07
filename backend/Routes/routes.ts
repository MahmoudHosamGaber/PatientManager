import express from "express";
import { router as AdminRouter } from "./API/AdminRoutes";
import { router as PatientRouter } from "./API/PatientRoutes";

const router = express.Router();

router.use("/admin", AdminRouter);
router.use("/patient", PatientRouter);

export default router;
