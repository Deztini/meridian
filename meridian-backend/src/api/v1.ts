import {Router} from "express";
import authRoutes from "../features/auth/auth.route";
import usageRoutes from "../features/usage/usage.route"


const router = Router();

router.use("/auth", authRoutes);

router.use ("/usage", usageRoutes);


export default router;