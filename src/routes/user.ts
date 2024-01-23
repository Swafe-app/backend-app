import { Router } from "express";
import { createUser, deleteUser, getUser, loginUser, updateUser, updateUserPassword, verifyEmail, uploadSelfie } from "../controllers/user";
import checkAuth from "../middleware/checkAuth";
import multer from "multer";

const router = Router();
const selfieUpload = multer({ dest: "uploads/selfies/" });

router.post("/login", loginUser);
router.post("/create", createUser);
router.get("/one", checkAuth, getUser);
router.put("/update", checkAuth, updateUser);
router.put("/updatePassword", checkAuth, updateUserPassword);
router.delete("/delete", checkAuth, deleteUser);
router.get("/verifyEmail/:token", verifyEmail);
router.post("/upload-selfie", checkAuth, selfieUpload.single("file"), uploadSelfie);

export default router;
