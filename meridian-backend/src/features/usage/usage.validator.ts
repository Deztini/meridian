import { z } from "zod";

export const createUsageEventSchema = z.object({
  eventType: z.string().min(1, "eventType is required "),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const simulateUsageSchema = z.object({
  count: z.number().int().min(1).max(5000),
  eventType: z.string().min(1).default("api_call"),
});


export type SimulateUsageInput = z.infer<typeof simulateUsageSchema>;
export type createUsageEventInput = z.infer<typeof createUsageEventSchema>;
