import { createClient } from "redis";
import { env } from "../config/env";

export const redis = createClient({
  url: env.redisUrl,
  disableOfflineQueue: true,
});

redis.on("error", (err) => console.log("Redis client error", err));

export async function connectRedis() {
  if (!redis.isOpen) await redis.connect();
} 
