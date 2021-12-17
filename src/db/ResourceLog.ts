import { Document, Schema, model } from 'mongoose';

export interface IResourceLog extends Document{
    userId: string,
    rmCount: number,
    scrapCount: number,
    username: string,
    discriminator: string,
}

export const ResourceLogSchema = new Schema({
  userId: {
    unique: true,
    required: true,
    type: String,
  },
  username: {
    required: true,
    type: String,
  },
  rmCount: {
    type: Number,
    default: 0,
  },
  scrapCount: {
    type: Number,
    default: 0,
  },
});

const ResourceLog = model<IResourceLog>('ResourceLog', ResourceLogSchema);
export default ResourceLog;
