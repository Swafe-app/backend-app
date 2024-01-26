import { Router } from "express";
import { createAdmin, getAdmins, getUsers, updateUserSelfieStatus } from "../controllers/admin";
import checkAuth from "../middleware/checkAuth";
import checkIsAdmin from "../middleware/checkIsAdmin";

const router = Router();

router.post("/create", checkAuth, checkIsAdmin, createAdmin);
router.get("/userList", checkAuth, checkIsAdmin, getUsers);
router.get("/adminList", checkAuth, checkIsAdmin, getAdmins);
router.put("/updateUser", checkAuth, checkIsAdmin, updateUserSelfieStatus);

export default router;
