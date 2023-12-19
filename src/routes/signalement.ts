import { Router } from "express";
import { createSignalement, getSignalements, getSignalement, getUserSignalements, updateSignalement, deleteSignalement } from "../controllers/signalement";
import checkAuth from "../middleware/checkAuth";

const router = Router();

router.post("/create", checkAuth, createSignalement);
router.get("/list", checkAuth, getSignalements);
router.get("/one/:id", checkAuth, getSignalement);
router.get("/user", checkAuth, getUserSignalements);
router.put("/update/:id", checkAuth, updateSignalement);
router.delete("/delete/:id", checkAuth, deleteSignalement);

export default router;
