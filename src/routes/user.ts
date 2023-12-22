import { Router } from "express";
import { createUser, deleteUser, getUser, loginUser, updateUser, updateUserPassword, verifyEmail } from "../controllers/user";
import checkAuth from "../middleware/checkAuth";

const router = Router();

router.post("/login", loginUser);
router.post("/create", createUser);
router.get("/one", checkAuth, getUser);
router.put("/update", checkAuth, updateUser);
router.put("/updatePassword", checkAuth, updateUserPassword);
router.delete("/delete", checkAuth, deleteUser);
router.get("/verifyEmail/:token", verifyEmail);

export default router;
