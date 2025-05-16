// passwordRouter.js
import { Router } from "express";
import { forgotPassword, resetPassword, renderResetPassword } from "../controllers/passwordController.js";

const router = Router();

router.post("/forgot-password", forgotPassword);
router.get("/reset-password/:token", renderResetPassword);
router.post("/reset-password/:token", resetPassword);

export default router;

