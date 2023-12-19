import { Router } from "express";
import { createSignalement, getSignalements, getSignalement, getUserSignalements } from "../controllers/signalement";
import checkAuth from "../middleware/checkAuth";

const router = Router();

router.post("/create", createSignalement);
router.get("/list", getSignalements);
router.get("/one/:id", getSignalement);
router.get("/user", checkAuth, getUserSignalements);

export default router;
