import express from "express";
import { router as AdminRouter } from "./API/AdminRoutes";
import { router as PatientRouter } from "./API/PatientRoutes";
import { router as AppointmentRouter } from "./API/AppointmentRoutes";

const router = express.Router();

router.use("/admin", AdminRouter);
router.use("/patient", PatientRouter);
router.use("/appointment", AppointmentRouter);

export default router;
