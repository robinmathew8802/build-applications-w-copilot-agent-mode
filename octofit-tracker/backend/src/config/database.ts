import mongoose from 'mongoose'

export const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db'

export async function connectDatabase() {
  await mongoose.connect(MONGO_URL)
}

export default mongoose
