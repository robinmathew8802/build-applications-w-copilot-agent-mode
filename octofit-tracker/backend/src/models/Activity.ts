import mongoose, { Document, Model, Schema, Types } from 'mongoose'

export interface ActivityDocument extends Document {
  user: Types.ObjectId
  type: string
  durationMinutes: number
  caloriesBurned: number
  date: Date
  createdAt: Date
  updatedAt: Date
}

const activitySchema = new Schema<ActivityDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    date: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
)

export const Activity: Model<ActivityDocument> =
  (mongoose.models.Activity as Model<ActivityDocument>) ||
  mongoose.model<ActivityDocument>('Activity', activitySchema)
