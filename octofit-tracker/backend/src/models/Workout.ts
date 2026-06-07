import mongoose, { Document, Model, Schema } from 'mongoose'

export interface WorkoutDocument extends Document {
  name: string
  focusArea: string
  durationMinutes: number
  difficulty: string
  createdAt: Date
  updatedAt: Date
}

const workoutSchema = new Schema<WorkoutDocument>(
  {
    name: { type: String, required: true },
    focusArea: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    difficulty: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

export const Workout: Model<WorkoutDocument> =
  (mongoose.models.Workout as Model<WorkoutDocument>) ||
  mongoose.model<WorkoutDocument>('Workout', workoutSchema)
