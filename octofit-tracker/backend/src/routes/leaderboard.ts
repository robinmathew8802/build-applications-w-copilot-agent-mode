import { Router } from 'express'
import { LeaderboardEntry } from '../models/Leaderboard'

const router = Router()

router.get('/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find()
    .populate('user')
    .sort({ score: -1, rank: 1 })
    .limit(10)
  res.json(leaderboard)
})

router.post('/', async (req, res) => {
  const entry = await LeaderboardEntry.create(req.body)
  res.status(201).json(entry)
})

export default router
