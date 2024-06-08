import { Router } from "express";
import { methods as ticketController } from "../controllers/ticket.controller";

const router = Router();

router.get("/", ticketController.getTickets);
router.get("/:id", ticketController.getTicket);
router.post("/", ticketController.addTickets);
router.delete("/:id", ticketController.deleteTicket);
router.put("/:id", ticketController.updateTicket);

export default router;