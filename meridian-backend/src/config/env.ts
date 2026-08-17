import "dotenv/config";

export const env = {
  port: process.env.PORT ?? 4000,
  nodeEnv: process.env.NODE_ENV,
  databaseUrl: process.env.MONGODB_URI!,
  clientOrigin: process.env.CLIENT_ORIGIN
};
