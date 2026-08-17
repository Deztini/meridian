import "dotenv/config";

export const env = {
  port: process.env.PORT ?? 4000,
  nodeEnv: process.env.NODE_ENV,
  databaseUrl: process.env.MONGODB_URI!,
  clientOrigin: process.env.CLIENT_ORIGIN,
  jwtVerifySecret: process.env.JWT_VERIFY_SECRET!,
  mailtrap: {
    token: process.env.MAILTRAP_TOKEN,
    fromEmail: process.env.MAILTRAP_FROM_EMAIL,
    fromName: process.env.MAILTRAP_FROM_NAME,
  },
};
