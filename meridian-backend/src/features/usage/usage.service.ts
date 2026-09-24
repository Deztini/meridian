import { prisma } from "../../lib/prisma";
import { ApiError } from "../../utils/ApiError";
import { UsageEvent } from "./usage.model";
import type {
  createUsageEventInput,
  SimulateUsageInput,
} from "./usage.validator";
import { Decimal } from "@prisma/client/runtime/client";

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

  async simulateUsage(input: SimulateUsageInput, customerId: string) {
    const { count, eventType } = input;
    const { periodStart, periodEnd } = getCurrentBillingPeriod();
    const now = Date.now();

    const events = Array.from({ length: count }, () => ({
      customerId,
      event: eventType,
      timestamp: new Date(
        periodStart.getTime() +
          Math.random() * (periodEnd.getTime() - periodStart.getTime()),
      ),
    }));

    await UsageEvent.insertMany(events);

    return { created: count };
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
        customerId
      },
      orderBy: {
        periodStart: "desc"
      }
    });
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
