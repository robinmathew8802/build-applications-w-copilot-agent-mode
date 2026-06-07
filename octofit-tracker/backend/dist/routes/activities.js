"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Activity_1 = require("../models/Activity");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const activities = await Activity_1.Activity.find().populate('user');
    res.json(activities);
});
router.get('/:id', async (req, res) => {
    const activity = await Activity_1.Activity.findById(req.params.id).populate('user');
    if (!activity) {
        return res.status(404).json({ error: 'Activity not found' });
    }
    res.json(activity);
});
router.post('/', async (req, res) => {
    const activity = await Activity_1.Activity.create(req.body);
    res.status(201).json(activity);
});
exports.default = router;
//# sourceMappingURL=activities.js.map