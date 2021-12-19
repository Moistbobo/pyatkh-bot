import { Document, Schema, model } from 'mongoose';

export interface IAmmoUsage extends Document{
    userId: string,
    a36mmCount: number,
    a120mmCount: number,
    username: string,
    discriminator: string,
}

export const AmmoUsageSchema = new Schema(
  {
    userId: {
      unique: true,
      required: true,
      type: String,
    },
    username: {
      required: true,
      type: String,
    },
    a36mmCount: {
      type: Number,
      default: 0,
    },
    a120mmCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const AmmoUsage = model<IAmmoUsage>('AmmoUsage', AmmoUsageSchema);
export default AmmoUsage;
