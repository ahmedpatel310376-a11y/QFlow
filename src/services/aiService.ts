import { env } from "../config/env";

export async function predictWaitTime(input: {
  queueLength: number;
  activeCounters: number;
  averageServiceMinutes: number;
  crowdLevel?: number;
}) {
  try {
    const response = await fetch(`${env.aiServiceUrl}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input)
    });

    if (!response.ok) throw new Error("AI service unavailable");
    return await response.json();
  } catch {
    const counters = Math.max(1, input.activeCounters);
    const estimate =
      (input.queueLength * input.averageServiceMinutes) / counters;

    return {
      predicted_wait_minutes: Math.max(0, Math.round(estimate)),
      confidence: 0.55,
      source: "fallback"
    };
  }
}
