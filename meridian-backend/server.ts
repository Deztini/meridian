import app from "./src";
import { connectDB } from "./src/config/db";
import { env } from "./src/config/env";

async function startServer() {
  await connectDB();

  app.listen(env.port, () => {
    console.log(`Server running on ${env.port}`);
  });
}


startServer();
