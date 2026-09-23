import { ApiError } from "../../utils/ApiError";
import { UsageEvent } from "./usage.model";
import type { createUsageEventInput } from "./usage.validator";

export const usageService = {
  async ingestUsageEvent(input: createUsageEventInput, customerId: string) {
    const { eventType, metadata } = input;
    if (!customerId || !eventType) {
      throw ApiError.badRequest("Customer id and eventType are required");
    }

    const usageEvent = await UsageEvent.create({
      customerId,
      event: eventType,
      ...(metadata !== undefined && { metadata }),
    });

    return { usageEvent };
  },
};
