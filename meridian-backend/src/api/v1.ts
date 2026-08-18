import Router from "express";
import authRoutes from "../features/auth/auth.route";


const router = Router();

router.use("/auth", authRoutes);


export default router;