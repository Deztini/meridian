import { z } from "zod";

export const createUsageEventSchema = z.object({
  eventType: z.string().min(1, "eventType is required "),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export type createUsageEventInput = z.infer<typeof createUsageEventSchema>;
