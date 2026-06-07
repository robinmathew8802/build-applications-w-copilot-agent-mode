import type { UserDocument } from './models/User'
import { Activity } from './models/Activity'
import { LeaderboardEntry } from './models/Leaderboard'
import { Team } from './models/Team'
import { User } from './models/User'
import { Workout } from './models/Workout'

export async function seedDatabase() {
  const existingUsers = await User.countDocuments()
  if (existingUsers > 0) {
    return
  }

  const team = await Team.create({
    name: 'OctoFit Champions',
    members: [],
  })

  const users = (await User.create([
    { name: 'Ava Reyes', email: 'ava.reyes@octofit.dev', team: team._id },
    { name: 'Noah Kim', email: 'noah.kim@octofit.dev', team: team._id },
    { name: 'Mia Patel', email: 'mia.patel@octofit.dev', team: team._id },
  ])) as UserDocument[]

  const [ava, noah, mia] = users
  if (!ava || !noah || !mia) {
    throw new Error('User seeding failed')
  }

  await Team.findByIdAndUpdate(team._id, {
    members: [ava._id, noah._id, mia._id],
  })

  const workouts = await Workout.create([
    {
      name: 'Morning Run',
      focusArea: 'Cardio',
      durationMinutes: 30,
      difficulty: 'Intermediate',
    },
    {
      name: 'Full-Body Strength',
      focusArea: 'Strength',
      durationMinutes: 45,
      difficulty: 'Advanced',
    },
    {
      name: 'Recovery Yoga',
      focusArea: 'Flexibility',
      durationMinutes: 25,
      difficulty: 'Beginner',
    },
  ])

  await Activity.create([
    {
      user: ava._id,
      type: 'Running',
      durationMinutes: 35,
      caloriesBurned: 380,
      date: new Date(),
    },
    {
      user: noah._id,
      type: 'Cycling',
      durationMinutes: 40,
      caloriesBurned: 450,
      date: new Date(),
    },
    {
      user: mia._id,
      type: 'Strength Training',
      durationMinutes: 50,
      caloriesBurned: 520,
      date: new Date(),
    },
  ])

  await LeaderboardEntry.create([
    { user: mia._id, rank: 1, score: 5200 },
    { user: noah._id, rank: 2, score: 4500 },
    { user: ava._id, rank: 3, score: 3800 },
  ])
}
