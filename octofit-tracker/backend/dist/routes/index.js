"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_1 = require("../config/api");
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
const router = (0, express_1.Router)();
router.get('/api', (_req, res) => {
    res.json({
        message: 'OctoFit API',
        baseUrl: (0, api_1.getApiBaseUrl)(),
        endpoints: [
            '/api/users/',
            '/api/teams/',
            '/api/activities/',
            '/api/leaderboard/',
            '/api/workouts/',
        ],
    });
});
router.get('/api/users/', async (_req, res) => {
    const users = await user_1.User.find().lean();
    res.json(users);
});
router.get('/api/teams/', async (_req, res) => {
    const teams = await team_1.Team.find().populate('members').lean();
    res.json(teams);
});
router.get('/api/activities/', async (_req, res) => {
    const activities = await activity_1.Activity.find().populate('user').lean();
    res.json(activities);
});
router.get('/api/leaderboard/', async (_req, res) => {
    const leaderboard = await leaderboard_1.LeaderboardEntry.find().populate('user').lean();
    res.json(leaderboard);
});
router.get('/api/workouts/', async (_req, res) => {
    const workouts = await workout_1.Workout.find().lean();
    res.json(workouts);
});
exports.default = router;
