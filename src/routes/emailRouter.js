import { Router } from "express";
import { sendEmailEthereal } from "../controllers/emailController.js";


const router = Router();

router.post('/send', sendEmailEthereal)

export default router;
