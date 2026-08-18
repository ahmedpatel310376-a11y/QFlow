import mongoose, { Document, Schema } from "mongoose";

export interface IOrganization extends Document {
  name: string;
  type: string;
  address?: string;
}

const schema = new Schema<IOrganization>(
  {
    name: { type: String, required: true },
    type: { type: String, required: true },
    address: String
  },
  { timestamps: true }
);

export const Organization = mongoose.model<IOrganization>("Organization", schema);
