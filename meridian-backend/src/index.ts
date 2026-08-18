import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser"
import { env } from "./config/env";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";
import v1Router from "./api/v1";

const app = express();

app.use(helmet());
app.use(cors({origin: env.clientOrigin, credentials: true}));
app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req, res) => {
  res.json({status: "ok"});
});

app.use("/api/v1", v1Router);

app.use(notFound);
app.use(errorHandler);

export default app;