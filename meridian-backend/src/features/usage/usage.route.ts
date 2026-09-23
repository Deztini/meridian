import { Router } from "express";
import { authenticate } from "../../middleware/authenticate";
import { validate } from "../../middleware/validate";
import { createUsageEventSchema } from "./usage.validator";
import { usageController } from "./usage.controller";

const router = Router();

router.post("/events", authenticate, validate(createUsageEventSchema), usageController.ingestUsageEvent);


export default router;