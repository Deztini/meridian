import type { IUser } from "../features/auth/auth.model";

declare global {
  namespace Express {
    interface Request {
      user?: IUser;
      idempotencyKey?: string;
    }
  }
}