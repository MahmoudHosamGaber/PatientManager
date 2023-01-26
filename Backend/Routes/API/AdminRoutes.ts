import express, { Router } from "express";
import { getAdmins } from "../../Controller/AdminController";

export const router = express.Router();

router.get("/", getAdmins);
