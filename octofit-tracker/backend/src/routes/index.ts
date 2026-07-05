import { Router } from 'express';
import { getApiBaseUrl } from '../config/api';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { LeaderboardEntry } from '../models/leaderboard';
import { Workout } from '../models/workout';

const router = Router();

router.get('/api', (_req, res) => {
  res.json({
    message: 'OctoFit API',
    baseUrl: getApiBaseUrl(),
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
  const users = await User.find().lean();
  res.json(users);
});

router.get('/api/teams/', async (_req, res) => {
  const teams = await Team.find().populate('members').lean();
  res.json(teams);
});

router.get('/api/activities/', async (_req, res) => {
  const activities = await Activity.find().populate('user').lean();
  res.json(activities);
});

router.get('/api/leaderboard/', async (_req, res) => {
  const leaderboard = await LeaderboardEntry.find().populate('user').lean();
  res.json(leaderboard);
});

router.get('/api/workouts/', async (_req, res) => {
  const workouts = await Workout.find().lean();
  res.json(workouts);
});

export default router;
