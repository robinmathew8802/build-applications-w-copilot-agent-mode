"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedDatabase = seedDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
const Activity_1 = require("../models/Activity");
const Leaderboard_1 = require("../models/Leaderboard");
const Team_1 = require("../models/Team");
const User_1 = require("../models/User");
const Workout_1 = require("../models/Workout");
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/octofit_db';
// Seed the octofit_db database with test data
async function seedDatabase() {
    console.log('Seed the octofit_db database with test data');
    const existingUsers = await User_1.User.countDocuments();
    if (existingUsers > 0) {
        return;
    }
    const team = await Team_1.Team.create({
        name: 'OctoFit Champions',
        members: [],
    });
    const users = (await User_1.User.create([
        { name: 'Ava Reyes', email: 'ava.reyes@octofit.dev', team: team._id },
        { name: 'Noah Kim', email: 'noah.kim@octofit.dev', team: team._id },
        { name: 'Mia Patel', email: 'mia.patel@octofit.dev', team: team._id },
    ]));
    const [ava, noah, mia] = users;
    if (!ava || !noah || !mia) {
        throw new Error('User seeding failed');
    }
    await Team_1.Team.findByIdAndUpdate(team._id, {
        members: [ava._id, noah._id, mia._id],
    });
    const workouts = await Workout_1.Workout.create([
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
    ]);
    await Activity_1.Activity.create([
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
    ]);
    await Leaderboard_1.LeaderboardEntry.create([
        { user: mia._id, rank: 1, score: 5200 },
        { user: noah._id, rank: 2, score: 4500 },
        { user: ava._id, rank: 3, score: 3800 },
    ]);
}
if (require.main === module) {
    mongoose_1.default
        .connect(MONGO_URL)
        .then(async () => {
        await seedDatabase();
        console.log('Seed script completed successfully');
        process.exit(0);
    })
        .catch((error) => {
        console.error('Seed script failed', error);
        process.exit(1);
    });
}
//# sourceMappingURL=seed.js.map