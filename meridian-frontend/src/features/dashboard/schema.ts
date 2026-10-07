import { z } from "zod";
export const simulateUsageSchema = z.object({
  count: z.number().int().min(1).max(5000),
  eventType: z.string().min(1).default("api_call"),
});

export type SimulateUsageFormInput = z.infer<typeof simulateUsageSchema>;
