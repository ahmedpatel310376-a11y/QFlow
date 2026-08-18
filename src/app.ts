import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import queueRoutes from "./routes/queueRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import { notFound, errorHandler } from "./middleware/error";
import { env } from "./config/env";

export const app = express();

app.use(cors({
  origin: env.clientUrl === "*" ? true : env.clientUrl,
  credentials: true
}));

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "QFlow backend is running",
    time: new Date().toISOString()
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/queues", queueRoutes);
app.use("/api/dashboard", dashboardRoutes);

app.use(notFound);
app.use(errorHandler);
