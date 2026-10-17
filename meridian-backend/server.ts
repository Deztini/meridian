import app from "./src";
import { connectDB } from "./src/config/db";
import { connectRedis } from "./src/lib/redis";
import { env } from "./src/config/env";

async function startServer() {
  await connectDB();
  await connectRedis();

  app.listen(env.port, () => {
    console.log(`Server running on ${env.port}`);
  });
}


startServer();
