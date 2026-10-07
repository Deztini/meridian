import { apiClient } from "@/lib/api";
import {
  SimulateUsagePayload,
  SimulateUsageResponse,
  UsageSummaryResponse,
} from "../types";

export async function getUsageSummary(): Promise<UsageSummaryResponse> {
  const { data } = await apiClient.get<UsageSummaryResponse>("/usage/summary");
  return data;
}

export async function simulateUsage(
  payload: SimulateUsagePayload,
): Promise<SimulateUsageResponse> {
  const { data } = await apiClient.post<SimulateUsageResponse>(
    "/usage/simulate",
    payload,
    {
      headers: {"idempotency-key": crypto.randomUUID()}
    }
  );
  return data;
}
