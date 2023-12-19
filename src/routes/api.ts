import { Router } from "express";
import signalementRouter from "./signalement";
import userRouter from "./user";

const router = Router();

router.use('/signalements', signalementRouter);
router.use('/user', userRouter);

export default router;
