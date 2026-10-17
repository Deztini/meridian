import type { Request, Response, NextFunction } from "express";
import { redis } from "../lib/redis";

type Options = {
  name: string;
  limit: number;
  windowSec: number;
  keyFn?: (req: Request) => void;
};

export function rateLimit({ name, limit,  windowSec, keyFn }: Options) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = keyFn ? keyFn(req) : (req.ip ?? "unknown");
      const key = `rl:${name}:${id}`;
      const count = await redis.incr(key);

      if (count === 1) await redis.expire(key, windowSec);

      if (count > limit) {
        const retryAfter = await redis.ttl(key);

        res.setHeader("Retry-After", Math.max(retryAfter, 1));
        res.status(429).json({
          success: false,
          message: "Too many requests. Please try again later.",
        });

        
      }

      next();
    } catch {
      next();
    }
  };
}
