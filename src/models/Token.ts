import mongoose, { Document, Schema } from "mongoose";

export type TokenStatus = "waiting" | "called" | "serving" | "completed" | "skipped" | "cancelled";

export interface IToken extends Document {
  queueId: mongoose.Types.ObjectId;
  userId?: mongoose.Types.ObjectId;
  number: number;
  status: TokenStatus;
  joinedAt: Date;
  calledAt?: Date;
  completedAt?: Date;
}

const schema = new Schema<IToken>(
  {
    queueId: { type: Schema.Types.ObjectId, ref: "Queue", required: true, index: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    number: { type: Number, required: true },
    status: {
      type: String,
      enum: ["waiting", "called", "serving", "completed", "skipped", "cancelled"],
      default: "waiting"
    },
    joinedAt: { type: Date, default: Date.now },
    calledAt: Date,
    completedAt: Date
  },
  { timestamps: true }
);

schema.index({ queueId: 1, number: 1 }, { unique: true });

export const Token = mongoose.model<IToken>("Token", schema);
