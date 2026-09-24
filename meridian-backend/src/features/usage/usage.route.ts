import { Router } from "express";
import { authenticate } from "../../middleware/authenticate";
import { validate } from "../../middleware/validate";
import { createUsageEventSchema, simulateUsageSchema } from "./usage.validator";
import { usageController } from "./usage.controller";

const router = Router();

router.post("/events", authenticate, validate(createUsageEventSchema), usageController.ingestUsageEvent);

router.get("/summary", authenticate, usageController.getUsageSummary);

router.post("/simulate", authenticate, validate(simulateUsageSchema), usageController.simulateUsage);

router.post("/invoices/generate", authenticate, usageController.generateInvoice);

router.get("/invoices", authenticate, usageController.getInvoices);


export default router;