"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = require("../models/User");
const router = (0, express_1.Router)();
router.get('/', async (_req, res) => {
    const users = await User_1.User.find().populate('team');
    res.json(users);
});
router.get('/:id', async (req, res) => {
    const user = await User_1.User.findById(req.params.id).populate('team');
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
});
router.post('/', async (req, res) => {
    const user = await User_1.User.create(req.body);
    res.status(201).json(user);
});
exports.default = router;
//# sourceMappingURL=users.js.map