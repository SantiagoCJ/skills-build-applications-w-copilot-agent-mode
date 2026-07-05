import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    focus: { type: String, required: true },
  },
  { timestamps: true },
);

export const Team = model('Team', teamSchema);
