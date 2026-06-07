import express from 'express'
import activitiesRouter from './routes/activities'
import leaderboardRouter from './routes/leaderboard'
import teamsRouter from './routes/teams'
import usersRouter from './routes/users'
import workoutsRouter from './routes/workouts'
import { seedDatabase } from './scripts/seed'
import { connectDatabase, MONGO_URL } from './config/database'

const codespaceName = process.env.CODESPACE_NAME
const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'
const PORT = Number(process.env.PORT) || 8000

const app = express()
app.use(express.json())

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', apiBaseUrl: API_BASE_URL })
})

app.get('/api/config', (_req, res) => {
  res.json({ apiBaseUrl: API_BASE_URL, port: PORT })
})

app.use('/api/users', usersRouter)
app.use('/api/teams', teamsRouter)
app.use('/api/activities', activitiesRouter)
app.use('/api/workouts', workoutsRouter)
app.use('/api/leaderboard', leaderboardRouter)

app.use((_req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

async function start() {
  try {
    await connectDatabase()
    console.log(`Connected to MongoDB at ${MONGO_URL}`)
    await seedDatabase()
    app.listen(PORT, () => {
      console.log(`Backend listening on port ${PORT}`)
      console.log(`API base URL: ${API_BASE_URL}`)
    })
  } catch (error) {
    console.error('Failed to start backend', error)
    process.exit(1)
  }
}

start()
