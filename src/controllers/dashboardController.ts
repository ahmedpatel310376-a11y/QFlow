import { Request, Response } from "express";
import { Queue } from "../models/Queue";
import { Token } from "../models/Token";

export async function summary(_req: Request, res: Response): Promise<void> {
  const [queues, waiting, serving, completed] = await Promise.all([
    Queue.countDocuments({ status: "open" }),
    Token.countDocuments({ status: "waiting" }),
    Token.countDocuments({ status: "serving" }),
    Token.countDocuments({ status: "completed" })
  ]);

  res.json({
    success: true,
    data: {
      queues,
      waiting,
      serving,
      completed
    }
  });
}
