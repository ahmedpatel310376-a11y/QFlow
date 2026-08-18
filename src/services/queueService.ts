import mongoose from "mongoose";
import { Queue } from "../models/Queue";
import { Token, TokenStatus } from "../models/Token";
import { User } from "../models/User";

export async function joinQueue(
  queueId: string,
  userId: string
) {
  const queue = await Queue.findById(queueId);
  if (!queue) throw new Error("Queue not found");
  if (queue.status !== "open") throw new Error("Queue is not open");

  const existing = await Token.findOne({
    queueId,
    userId,
    status: { $in: ["waiting", "called", "serving"] }
  });

  if (existing) return existing;

  const last = await Token.findOne({ queueId }).sort({ number: -1 });
  const number = (last?.number ?? queue.currentServingNumber) + 1;

  return Token.create({
    queueId,
    userId,
    number,
    status: "waiting"
  });
}

export async function callNext(queueId: string) {
  const queue = await Queue.findById(queueId);
  if (!queue) throw new Error("Queue not found");

  const next = await Token.findOneAndUpdate(
    { queueId, status: "waiting" },
    { $set: { status: "called", calledAt: new Date() } },
    { sort: { number: 1 }, new: true }
  );

  if (!next) throw new Error("No waiting tokens");

  queue.currentServingNumber = next.number;
  await queue.save();

  return next;
}

export async function tokenAction(
  tokenId: string,
  action: "recall" | "start" | "complete" | "skip" | "cancel",
  user: { userId: string; role: string }
) {
  const token = await Token.findById(tokenId);
  if (!token) throw new Error("Token not found");

  const map: Record<string, TokenStatus> = {
    recall: "called",
    start: "serving",
    complete: "completed",
    skip: "skipped",
    cancel: "cancelled"
  };

  token.status = map[action];
  if (action === "complete") token.completedAt = new Date();
  await token.save();

  return token;
}

export async function queueStats(queueId: string) {
  const queueObjectId = new mongoose.Types.ObjectId(queueId);

  const [waiting, called, serving, completed] = await Promise.all([
    Token.countDocuments({ queueId: queueObjectId, status: "waiting" }),
    Token.countDocuments({ queueId: queueObjectId, status: "called" }),
    Token.countDocuments({ queueId: queueObjectId, status: "serving" }),
    Token.countDocuments({ queueId: queueObjectId, status: "completed" })
  ]);

  const queue = await Queue.findById(queueId);

  const estimatedWaitMinutes =
    waiting * (queue?.averageServiceMinutes ?? 5);

  return {
    waiting,
    called,
    serving,
    completed,
    estimatedWaitMinutes
  };
}

export async function getUserToken(userId: string, tokenId: string) {
  return Token.findOne({ _id: tokenId, userId }).populate("queueId");
}
