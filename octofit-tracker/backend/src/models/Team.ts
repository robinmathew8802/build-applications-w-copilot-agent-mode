import mongoose, { Document, Model, Schema, Types } from 'mongoose'

export interface TeamDocument extends Document {
  name: string
  members: Types.ObjectId[]
  createdAt: Date
  updatedAt: Date
}

const teamSchema = new Schema<TeamDocument>(
  {
    name: { type: String, required: true },
    members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  },
  {
    timestamps: true,
  }
)

export const Team: Model<TeamDocument> =
  (mongoose.models.Team as Model<TeamDocument>) ||
  mongoose.model<TeamDocument>('Team', teamSchema)
