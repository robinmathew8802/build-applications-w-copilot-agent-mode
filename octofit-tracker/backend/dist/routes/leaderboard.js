"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Leaderboard_1 = require("../models/Leaderboard");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const leaderboard = await Leaderboard_1.LeaderboardEntry.find()
        .populate('user')
        .sort({ score: -1, rank: 1 })
        .limit(10);
    res.json(leaderboard);
});
router.post('/', async (req, res) => {
    const entry = await Leaderboard_1.LeaderboardEntry.create(req.body);
    res.status(201).json(entry);
});
exports.default = router;
//# sourceMappingURL=leaderboard.js.map