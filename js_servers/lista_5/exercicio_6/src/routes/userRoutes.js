import { Router } from "express";
import { userController } from "../controllers/index.js";
import { authMiddleware, isAdmin } from "../middlewares/authMiddleware.js";

const router = Router();

// POST /api/user
router.post("/", userController.createUser);

// GET /api/user/
router.get("/", authMiddleware, userController.getMe);

// GET /api/user/all   (TEM que vir antes de :username)
router.get("/all", authMiddleware, isAdmin, userController.getAllUsers);

// GET /api/user/:username
router.get("/:username", authMiddleware, isAdmin, userController.getUserByUsername);

// PUT /api/user/:username
router.put("/:username", authMiddleware, isAdmin, userController.updateUser);

// DELETE /api/user/:username
router.delete("/:username", authMiddleware, isAdmin, userController.deleteUser);

export default router;  