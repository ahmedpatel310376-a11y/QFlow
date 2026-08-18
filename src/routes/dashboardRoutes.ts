import { Router } from "express";
import { summary } from "../controllers/dashboardController";

const router = Router();

router.get("/summary", summary);

export default router;
