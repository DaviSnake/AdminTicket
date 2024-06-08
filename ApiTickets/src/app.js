import express from "express";
import morgan from "morgan";
import ticketRoutes from "./routes/ticket.routes"
import cors from "cors";

const app = express();

//Setting
app.set("port", 3001);

//Middleware
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/tickets", ticketRoutes);

export default app;