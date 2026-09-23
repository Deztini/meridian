import type { NextFunction, Request, Response } from "express";
import type { IUser } from "../auth/auth.model";
import { usageService } from "./usage.service";
import { ApiResponse } from "../../utils/ApiResponse";

export const usageController = {
  async ingestUsageEvent(req: Request, res: Response, next: NextFunction) {
    try {
      const user = req.user as IUser;

      const { usageEvent } = await usageService.ingestUsageEvent(
        req.body,
        user._id.toString(),
      );

      return new ApiResponse(201, "Usage event recorded", {
        event: {
          eventType: usageEvent.event,
          timestamp: usageEvent.timeStamps,
        },
      });
    } catch (error) {
      next(error);
    }
  },
};
