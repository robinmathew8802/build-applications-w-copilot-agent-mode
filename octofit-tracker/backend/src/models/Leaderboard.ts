import mongoose, { Document, Model, Schema, Types } from 'mongoose'

export interface LeaderboardEntryDocument extends Document {
  user: Types.ObjectId
  rank: number
  score: number
  createdAt: Date
  updatedAt: Date
}

const leaderboardEntrySchema = new Schema<LeaderboardEntryDocument>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    rank: { type: Number, required: true },
    score: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
)

export const LeaderboardEntry: Model<LeaderboardEntryDocument> =
  (mongoose.models.LeaderboardEntry as Model<LeaderboardEntryDocument>) ||
  mongoose.model<LeaderboardEntryDocument>('LeaderboardEntry', leaderboardEntrySchema)
