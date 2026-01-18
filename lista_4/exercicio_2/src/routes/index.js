import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import customerRoutes from "./customerRoutes.js";
import orderRoutes from "./orderRoutes.js";
import productRoutes from "./productRoutes.js";
import userRoutes from "./userRoutes.js";

const router = Router();

router.use("/login", userRoutes);

router.use("/customer", authMiddleware, customerRoutes);
router.use("/order", authMiddleware, orderRoutes);
router.use("/product", authMiddleware, productRoutes);


export default router;