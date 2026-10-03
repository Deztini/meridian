export interface UsageSummaryResponse {
  success: boolean;
  message: string;
  data?: {
    summary: {
      periodStart: Date;
      periodEnd: Date;
      usageCount: number;
      overageUnits: number;
      overageCharge: number;
      total: number;
      includedUnits: number;
      platformFee: number;
    };
  };
}
