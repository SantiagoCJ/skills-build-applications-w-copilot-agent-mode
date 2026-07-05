"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const api_1 = require("../config/api");
const router = (0, express_1.Router)();
const resources = {
    users: [{ id: 1, name: 'Ava', email: 'ava@example.com' }],
    teams: [{ id: 1, name: 'Rocket Squad', members: 4 }],
    activities: [{ id: 1, type: 'Run', duration: '30m', calories: 320 }],
    leaderboard: [{ id: 1, name: 'Ava', score: 1200 }],
    workouts: [{ id: 1, title: 'HIIT Circuit', difficulty: 'Intermediate' }],
};
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
router.get('/api/users/', (_req, res) => {
    res.json(resources.users);
});
router.get('/api/teams/', (_req, res) => {
    res.json(resources.teams);
});
router.get('/api/activities/', (_req, res) => {
    res.json(resources.activities);
});
router.get('/api/leaderboard/', (_req, res) => {
    res.json(resources.leaderboard);
});
router.get('/api/workouts/', (_req, res) => {
    res.json(resources.workouts);
});
exports.default = router;
