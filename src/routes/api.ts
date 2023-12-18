import { Router } from "express";
import signalementRouter from "./signalement";

const router = Router();

router.use('/signalements', signalementRouter);

export default router;
