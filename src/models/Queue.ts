import mongoose, { Document, Schema } from "mongoose";

export interface IQueue extends Document {
  name: string;
  organizationId: mongoose.Types.ObjectId;
  serviceName: string;
  status: "open" | "paused" | "closed";
  capacity: number;
  currentServingNumber: number;
  averageServiceMinutes: number;
  createdAt: Date;
}

const schema = new Schema<IQueue>(
  {
    name: { type: String, required: true },
    organizationId: { type: Schema.Types.ObjectId, ref: "Organization", required: true },
    serviceName: { type: String, required: true },
    status: { type: String, enum: ["open", "paused", "closed"], default: "open" },
    capacity: { type: Number, default: 100 },
    currentServingNumber: { type: Number, default: 0 },
    averageServiceMinutes: { type: Number, default: 5 }
  },
  { timestamps: true }
);

export const Queue = mongoose.model<IQueue>("Queue", schema);
