import express from "express";
import { router as AdminRouter } from "./API/AdminRoutes";

const router = express.Router();

router.use("/admin", AdminRouter);

export default router;
