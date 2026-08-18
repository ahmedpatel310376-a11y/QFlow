import { Router } from "express";
import {
  listQueues,
  createQueue,
  getQueue,
  join,
  next,
  action,
  crowd,
  myToken,
  predict
} from "../controllers/queueController";
import { auth, roles } from "../middleware/auth";

const router = Router();

router.get("/", listQueues);
router.post("/", auth, roles("admin", "staff"), createQueue);
router.get("/:id", getQueue);

router.post("/:id/join", auth, join);
router.post("/:id/next", auth, roles("admin", "staff"), next);
router.get("/:id/crowd", crowd);

router.post("/token/:id/action", auth, action);
router.get("/token/:id", auth, myToken);

router.post("/:id/predict-wait", predict);

export default router;
