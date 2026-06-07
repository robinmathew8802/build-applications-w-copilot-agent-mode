import express from 'express'
import mongoose from 'mongoose'

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit'
const PORT = Number(process.env.PORT) || 8000

const app = express()
app.use(express.json())

app.get('/health', (_req, res) => res.json({ status: 'ok' }))

async function start() {
  try {
    await mongoose.connect(MONGO_URL)
    console.log('Connected to MongoDB')
    app.listen(PORT, () => {
      console.log(`Backend listening: http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error('Failed to connect to MongoDB', err)
    process.exit(1)
  }
}

start()
