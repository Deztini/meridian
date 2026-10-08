import { prisma } from "../../lib/prisma";
import { ApiError } from "../../utils/ApiError";
import { UsageEvent } from "./usage.model";
import type {
  createUsageEventInput,
  SimulateUsageInput,
} from "./usage.validator";
import { Decimal } from "@prisma/client/runtime/client";

export const usageService = {
  async ingestUsageEvent(
    input: createUsageEventInput,
    customerId: string,
    idempotencyKey: string,
  ) {
    const { eventType, metadata } = input;

    const existing = await UsageEvent.findOne({ idempotencyKey });
    if (existing) {
      return { usageEvent: existing, duplicate: true };
    }
    if (!customerId || !eventType) {
      throw ApiError.badRequest("Customer id and eventType are required");
    }

    try {
      const usageEvent = await UsageEvent.create({
        customerId,
        event: eventType,
        idempotencyKey,
        ...(metadata !== undefined && { metadata }),
      });
      return { usageEvent, duplicate: false };
    } catch (err: any) {
      if (err.code === 11000) {
        const raceWinner = await UsageEvent.findOne({ idempotencyKey });
        if (raceWinner) {
          return { usageEvent: raceWinner, duplicate: true };
        }
      }
      throw err;
    }
  },

  async getUsageSummary(customerId: string) {
    const { periodStart, periodEnd } = getCurrentBillingPeriod();

    const [usageCount, plan] = await Promise.all([
      getUsageCount(customerId, periodStart, periodEnd),
      getCustomerPlan(customerId),
    ]);

    const bill = calculateBilling(usageCount, plan);

    return {
      periodStart,
      periodEnd,
      ...bill,
    };
  },

  async simulateUsage(
    input: SimulateUsageInput,
    customerId: string,
    idempotencyKey: string,
  ) {
    const { count, eventType } = input;
    const { periodStart, periodEnd } = getCurrentBillingPeriod();
    const now = Date.now();
       const windowMs = 2 * 60 * 60 * 1000;
    const windowStart = Math.max(now - windowMs, periodStart.getTime());
const span = now - windowStart;
    
    console.log(idempotencyKey);
    const existing = await UsageEvent.findOne({ idempotencyKey });
    console.log(existing);
    if (existing) {
      return { created: 0, duplicate: true };
    }
 
    const events = Array.from({ length: count }, (_, i) => ({
      customerId,
      event: eventType,
      idempotencyKey: `${idempotencyKey}:${i}`,
        timestamp: new Date(windowStart + Math.random() * span),
      // timestamp: new Date(
      //   periodStart.getTime() +
      //     Math.random() * (periodEnd.getTime() - periodStart.getTime()),
      // ),
    }));

    try {
      await UsageEvent.insertMany(events);
    } catch (err: any) {
      if (err.code === 11000) {
        return { created: 0, duplicate: true };
      }
      throw err;
    }
    return { created: count, duplicate: false };
  },

  async generateInvoice(customerId: string) {
    const summary = await this.getUsageSummary(customerId);

    const existingInvoice = await prisma.invoice.findFirst({
      where: {
        customerId,
        periodStart: summary.periodStart,
        periodEnd: summary.periodEnd,
      },
    });

    if (existingInvoice) {
      throw ApiError.badRequest("Invoice for this period already exists");
    }

    const invoice = await prisma.invoice.create({
      data: {
        customerId,
        periodStart: summary.periodStart,
        periodEnd: summary.periodEnd,
        usageCount: summary.usageCount,
        amountDue: summary.total,
        status: "pending",
      },
    });

    return invoice;
  },

  async getInvoices(customerId: string) {
    return prisma.invoice.findMany({
      where: {
        customerId,
      },
      orderBy: {
        periodStart: "desc",
      },
    });
  },

  async getUsageActivity(customerId: string) {
    const bucketMs = 15 * 60 * 1000;
    const since = Date.now() - 2 * 60 * 60 * 1000;

    const rows = await UsageEvent.aggregate([
      {$match: {customerId, timestamp: {$gte: new Date(since)}}},
      {
        $group: {
          _id: {
             $subtract: [
              {$toLong: "$timestamp"},
              {$mod: [{$toLong: "$timestamp"}, bucketMs]}
             ]
          },
          calls: {$sum: 1}
        }
      }
    ]);

    const counts = new Map<number, number>(rows.map((r) => [r._id, r.calls] ));
    const start = Math.floor(since/bucketMs) * bucketMs;
    const points = [];
    for (let i = start; i<=Date.now(); i+=bucketMs) {
      points.push({time: new Date(i).toISOString(), calls: counts.get(i) ?? 0})
    }

    return points;
  }
};





function getCurrentBillingPeriod() {
  const now = new Date();
  const periodStart = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1),
  );
  const periodEnd = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 0, 23, 59, 59, 999),
  );
  return { periodStart, periodEnd };
}

async function getUsageCount(
  customerId: string,
  periodStart: Date,
  periodEnd: Date,
) {
  return UsageEvent.countDocuments({
    customerId,
    timestamp: { $gte: periodStart, $lte: periodEnd },
  });
}

async function getCustomerPlan(customerId: string) {
  const subscription = await prisma.subscription.findUnique({
    where: { customerId },
    include: { plan: true },
  });

  if (!subscription) {
    throw ApiError.notFound("No active subscription found for this customer");
  }

  return subscription.plan;
}

function calculateBilling(
  usageCount: number,
  plan: { includedUnits: number; overageRate: Decimal; platformFee: Decimal },
) {
  const overageUnits = Math.max(0, usageCount - plan.includedUnits);
  const overageCharge = plan.overageRate.toNumber() * overageUnits;
  const total = plan.platformFee.toNumber() + overageCharge;

  return {
    usageCount,
    overageUnits,
    overageCharge,
    total,
    includedUnits: plan.includedUnits,
    platformFee: plan.platformFee.toNumber(),
  };
}
