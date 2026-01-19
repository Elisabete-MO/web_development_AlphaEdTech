import { Router } from "express";
import { authController, userController } from "../controllers/index.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

// POST /api/login   (não precisa de auth)
router.post("/", authController.autenticate);

// GET /api/login/
router.get("/", authMiddleware, userController.getMe);

// GET /api/login/all   (TEM que vir antes de :username)
router.get("/all", authMiddleware, isAdmin, userController.getAllUsers);

// GET /api/login/:username
router.get("/:username", authMiddleware, isAdmin, userController.getUserByUsername);

// POST /api/user
router.post("/", authMiddleware, isAdmin, userController.createUser);

// PUT /api/login/:username
router.put("/:username", authMiddleware, isAdmin, userController.updateUser);

// DELETE /api/login/:username
router.delete("/:username", authMiddleware, isAdmin, userController.deleteUser);

export default router;  