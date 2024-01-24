import { Router } from "express";
import signalementRouter from "./signalement";
import userRouter from "./user";
import adminRouter from "./admin";

const router = Router();

router.use('/signalements', signalementRouter);
router.use('/users', userRouter);
router.use('/admins', adminRouter);

export default router;
