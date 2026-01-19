import { Router } from "express";
import customerRoutes from "./customerRoutes.js";
import orderRoutes from "./orderRoutes.js";
import productRoutes from "./productRoutes.js";

const router = Router();

router.use("/customer", customerRoutes);
router.use("/order", orderRoutes);
router.use("/product", productRoutes);

export default router;