import { Router } from "express";
import { createSignalement, getSignalements, getSignalement } from "../controllers/signalement";

const router = Router();

router.post("/create", createSignalement);
router.get("/list", getSignalements);
router.get("/getOne/:id", getSignalement);

export default router;
