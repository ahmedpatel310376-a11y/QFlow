import { Request, Response } from "express";
import { Queue } from "../models/Queue";
import { joinQueue, callNext, tokenAction, queueStats, getUserToken } from "../services/queueService";
import { predictWaitTime } from "../services/aiService";

function getId(req: Request): string {
  const value = req.params.id;

  if (Array.isArray(value)) {
    return value[0];
  }

  return value;
}

export async function listQueues(req: Request, res: Response): Promise<void> {
  const filter = req.query.organizationId
    ? { organizationId: req.query.organizationId }
    : {};

  const queues = await Queue.find(filter).sort({ createdAt: -1 });

  res.json({
    success: true,
    data: queues
  });
}

export async function createQueue(req: Request, res: Response): Promise<void> {
  const {
    name,
    organizationId,
    serviceName,
    capacity,
    averageServiceMinutes
  } = req.body;

  if (!name || !organizationId || !serviceName) {
    res.status(400).json({
      success: false,
      message: "name, organizationId and serviceName are required"
    });
    return;
  }

  const queue = await Queue.create({
    name,
    organizationId,
    serviceName,
    capacity: capacity ?? 100,
    averageServiceMinutes: averageServiceMinutes ?? 5
  });

  res.status(201).json({
    success: true,
    data: queue
  });
}

export async function getQueue(req: Request, res: Response): Promise<void> {
  const id = getId(req);

  const queue = await Queue.findById(id);

  if (!queue) {
    res.status(404).json({
      success: false,
      message: "Queue not found"
    });
    return;
  }

  res.json({
    success: true,
    data: queue
  });
}

export async function join(req: Request, res: Response): Promise<void> {
  const id = getId(req);

  const token = await joinQueue(
    id,
    req.user!.userId
  );

  res.status(201).json({
    success: true,
    data: token
  });
}

export async function next(req: Request, res: Response): Promise<void> {
  const id = getId(req);

  const token = await callNext(id);

  res.json({
    success: true,
    data: token
  });
}

export async function action(req: Request, res: Response): Promise<void> {
  const id = getId(req);

  const allowed = [
    "recall",
    "start",
    "complete",
    "skip",
    "cancel"
  ] as const;

  const actionName = req.body.action;

  if (!allowed.includes(actionName)) {
    res.status(400).json({
      success: false,
      message: "action must be recall, start, complete, skip or cancel"
    });
    return;
  }

  const token = await tokenAction(
    id,
    actionName,
    req.user!
  );

  res.json({
    success: true,
    data: token
  });
}

export async function crowd(req: Request, res: Response): Promise<void> {
  const id = getId(req);

  const stats = await queueStats(id);

  const queue = await Queue.findById(id);

  const crowdLevel = queue
    ? Math.min(
        100,
        Math.round(
          (stats.waiting / Math.max(1, queue.capacity)) * 100
        )
      )
    : 0;

  res.json({
    success: true,
    data: {
      ...stats,
      crowdLevel,
      label:
        crowdLevel >= 80
          ? "high"
          : crowdLevel >= 50
          ? "medium"
          : "low"
    }
  });
}

export async function myToken(req: Request, res: Response): Promise<void> {
  const id = getId(req);

  const token = await getUserToken(
    req.user!.userId,
    id
  );

  if (!token) {
    res.status(404).json({
      success: false,
      message: "Token not found"
    });
    return;
  }

  res.json({
    success: true,
    data: token
  });
}

export async function predict(req: Request, res: Response): Promise<void> {
  const queueLength = Number(req.body.queueLength ?? 0);
  const activeCounters = Number(req.body.activeCounters ?? 1);
  const averageServiceMinutes = Number(
    req.body.averageServiceMinutes ?? 5
  );
  const crowdLevel = Number(req.body.crowdLevel ?? 0);

  const result = await predictWaitTime({
    queueLength,
    activeCounters,
    averageServiceMinutes,
    crowdLevel
  });

  res.json({
    success: true,
    data: result
  });
}