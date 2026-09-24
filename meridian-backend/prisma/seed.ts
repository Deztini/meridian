import { prisma } from "../src/lib/prisma";

async function main() {
  const existingPricingPlan = await prisma.pricingPlan.findFirst({
    where: { name: "Starter" },
  });
  if (existingPricingPlan) {
    console.log("Starter plan already exists", existingPricingPlan.id);
    return;
  }

  const plan = await prisma.pricingPlan.create({
    data: {
      name: "Starter",
      includedUnits: 1000,
      overageRate: 0.01,
      platformFee: 49,
    },
  });

  console.log("Created starter plan", plan.id);
}

main().finally(() => prisma.$disconnect());
