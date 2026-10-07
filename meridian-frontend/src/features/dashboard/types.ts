export interface UsageSummaryResponse {
  success: boolean;
  message: string;
  data?: {
    summary: {
      periodStart: string;
      periodEnd: string;
      usageCount: number;
      overageUnits: number;
      overageCharge: number;
      total: number;
      includedUnits: number;
      platformFee: number;
    };
  };
}

export interface SimulateUsageResponse {
  success: boolean;
  message: string;
  data?: {
    result: {
      created: number;
      duplicate: boolean;
    };
  };
}


export interface SimulateUsagePayload {
  count: number;
  eventType: string;
}
