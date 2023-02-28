import express, { Router } from "express";
import {
    registerAdmin,
    loginAdmin,
    changePassword,
} from "../../Controller/AdminController";
import authinticateAdmin from "../../Middleware/AuthMiddleware";
export const router = express.Router();

router.post("/", registerAdmin);
router.post("/login", loginAdmin);
router.put("/password", authinticateAdmin, changePassword);
