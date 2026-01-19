import { Router } from "express";
import { authController } from "../controllers/index.js";

const router = Router();

// POST /api/login   (não precisa de auth)
router.post("/", authController.autenticate);

export default router;  