import { Router } from "express";
import clientRoutes from "./clientRoutes.js";
import productRoutes from "./productRoutes.js";
import orderRoutes from "./orderRoutes.js";

export const router = Router();

router.use("/clients", clientRoutes);
router.use("/products", productRoutes);
router.use("/orders", orderRoutes);

