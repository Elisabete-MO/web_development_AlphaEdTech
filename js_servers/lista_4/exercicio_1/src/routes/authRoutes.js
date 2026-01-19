import { Router } from "express";
import { authController } from "../controllers/index.js";

const router = Router();

router.post("/", authController.autenticate);

export default router;