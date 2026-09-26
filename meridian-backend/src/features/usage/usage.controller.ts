import type { NextFunction, Request, Response } from "express";
import type { IUser } from "../auth/auth.model";
import { usageService } from "./usage.service";
import { ApiResponse } from "../../utils/ApiResponse";

export const usageController = {
  async ingestUsageEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as IUser;


      const { usageEvent, duplicate } = await usageService.ingestUsageEvent(
        req.body,
        user._id.toString(),
        req.idempotencyKey!
      );

      const status = duplicate ? 200 : 201;
      const message = duplicate ? "Event already recorded" : "Usage event recorded"

      return new ApiResponse(status, message, {
        event: {
          eventType: usageEvent?.event,
          timestamp: usageEvent?.timestamp,
        },
      }).send(res);
    } catch (error) {
      next(error);
    }
  },

  async getUsageSummary(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as IUser;

      const summary = await usageService.getUsageSummary(user._id.toString());

      return new ApiResponse(200, "Usage summary retrieved", {
        summary,
      }).send(res);
    } catch (error) {
      next(error);
    }
  },

  async simulateUsage(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as IUser;

      const result = await usageService.simulateUsage(
        req.body,
        user._id.toString(),
      );

      return new ApiResponse(201, "Usage events simulated", {
        result,
      }).send(res);
    } catch (error) {
      next(error);
    }
  },

  async generateInvoice(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as IUser;

      const invoice = await usageService.generateInvoice(user._id.toString());

      return new ApiResponse(201, "Invoice generated", {
        invoice,
      }).send(res);
    } catch (error) {
      next(error);
    }
  },

  async getInvoices(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as IUser;

      const invoices = await usageService.getInvoices(user._id.toString());

      return new ApiResponse(200, "Invoices retrieved", {
        invoices,
      }).send(res);
    } catch (error) {
      next(error);
    }
  },
};
