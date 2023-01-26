import express, { Router } from "express";
import { registerAdmin, loginAdmin } from "../../Controller/AdminController";
export const router = express.Router();

router.post("/", registerAdmin);
router.post("/login", loginAdmin);
