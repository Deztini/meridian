import mongoose, { Schema, type Document } from "mongoose";

export interface IUsageEvents extends Document {
  customerId: string;
  event: string;
  timestamp: Date;
  metadata: Record<string, unknown>;
  idempotencyKey: string;
  createdAt: Date;
  updatedAt: Date;
}

const UsageEventSchema = new Schema<IUsageEvents>(
  {
    customerId: { type: String, required: true, index: true },
    event: { type: String, required: true },
    timestamp: { type: Date, required: true, default: Date.now },
    metadata: { type: Schema.Types.Mixed, default: {} },
    idempotencyKey: {type: String, required: true, unique: true}
  },
  { timestamps: true },
);


export const UsageEvent = mongoose.model<IUsageEvents>("UsageEvent", UsageEventSchema);