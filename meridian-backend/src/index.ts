import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser"
import { env } from "./config/env";
import { notFound } from "./middleware/notFound";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(helmet());
app.use(cors({origin: env.clientOrigin, credentials: true}));
app.use(express.json());
app.use(cookieParser());

app.get("/health", (_req, res) => {
  res.json({status: "ok"});
});

app.use(notFound);
app.use(errorHandler);

export default app;