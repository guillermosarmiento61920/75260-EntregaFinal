// emailRouter.js
import { Router } from "express";
import { sendMailEth } from "../controllers/emailController.js";

const router = Router();

router.post("/send", sendMailEth);

export default router;

