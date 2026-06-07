"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Team_1 = require("../models/Team");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const teams = await Team_1.Team.find().populate('members');
    res.json(teams);
});
router.get('/:id', async (req, res) => {
    const team = await Team_1.Team.findById(req.params.id).populate('members');
    if (!team) {
        return res.status(404).json({ error: 'Team not found' });
    }
    res.json(team);
});
router.post('/', async (req, res) => {
    const team = await Team_1.Team.create(req.body);
    res.status(201).json(team);
});
exports.default = router;
//# sourceMappingURL=teams.js.map