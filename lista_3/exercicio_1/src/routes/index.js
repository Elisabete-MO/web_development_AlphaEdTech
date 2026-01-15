import { Router } from "express";
import orderRoutes from "./orderRoutes.js";
import productRoutes from "./productRoutes.js";

const router = Router();

router.use("/order", orderRoutes);
router.use("/product", productRoutes);

export default router;