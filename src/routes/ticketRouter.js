import { Router } from "express";
import TicketController from "../controllers/ticketController.js";
import { checkAuth } from "../middlewares/checkAuth.js";
const controller = new TicketController();

const router = Router();

router.post('/', checkAuth, controller.generateTicket);

export default router;