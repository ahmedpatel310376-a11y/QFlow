import mongoose, { Document, Schema } from "mongoose";

export type UserRole = "user" | "staff" | "admin";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  organizationId?: mongoose.Types.ObjectId;
  deviceToken?: string;
  createdAt: Date;
}

const schema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "staff", "admin"], default: "user" },
    organizationId: { type: Schema.Types.ObjectId, ref: "Organization" },
    deviceToken: String
  },
  { timestamps: true }
);

export const User = mongoose.model<IUser>("User", schema);
