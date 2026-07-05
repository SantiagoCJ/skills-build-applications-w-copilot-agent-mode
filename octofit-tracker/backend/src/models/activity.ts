import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    type: { type: String, required: true },
    duration: { type: String, required: true },
    calories: { type: Number, required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true },
);

export const Activity = model('Activity', activitySchema);
