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
