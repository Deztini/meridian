import { apiClient } from "@/lib/api";
import { UsageSummaryResponse } from "../types";

export async function getUsageSummary(): Promise<UsageSummaryResponse> {
  const { data } = await apiClient.get<UsageSummaryResponse>("/usage/summary");
  return data;
}
