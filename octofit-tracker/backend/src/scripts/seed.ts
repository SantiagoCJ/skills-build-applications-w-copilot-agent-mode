import mongoose from 'mongoose';
import { User } from '../models/user';
import { Team } from '../models/team';
import { Activity } from '../models/activity';
import { LeaderboardEntry } from '../models/leaderboard';
import { Workout } from '../models/workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Ava Chen',
        email: 'ava.chen@example.com',
        fitnessGoal: 'Improve endurance',
        experienceLevel: 'Intermediate',
      },
      {
        name: 'Noah Patel',
        email: 'noah.patel@example.com',
        fitnessGoal: 'Build strength',
        experienceLevel: 'Advanced',
      },
      {
        name: 'Mia Rodriguez',
        email: 'mia.rodriguez@example.com',
        fitnessGoal: 'Stay consistent',
        experienceLevel: 'Beginner',
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Rocket Squad',
        members: [users[0]._id, users[1]._id],
        focus: 'Endurance and interval training',
      },
      {
        name: 'Momentum Crew',
        members: [users[2]._id],
        focus: 'Mobility and recovery',
      },
    ]);

    await Activity.insertMany([
      {
        type: 'Run',
        duration: '35m',
        calories: 420,
        user: users[0]._id,
      },
      {
        type: 'Strength',
        duration: '45m',
        calories: 310,
        user: users[1]._id,
      },
      {
        type: 'Yoga',
        duration: '25m',
        calories: 180,
        user: users[2]._id,
      },
    ]);

    await LeaderboardEntry.insertMany([
      { user: users[0]._id, score: 1280, rank: 1 },
      { user: users[1]._id, score: 1180, rank: 2 },
      { user: users[2]._id, score: 980, rank: 3 },
    ]);

    await Workout.insertMany([
      {
        title: 'HIIT Circuit',
        difficulty: 'Intermediate',
        duration: '30 min',
        focus: 'Cardio',
      },
      {
        title: 'Upper Body Strength',
        difficulty: 'Advanced',
        duration: '45 min',
        focus: 'Strength',
      },
      {
        title: 'Recovery Flow',
        difficulty: 'Beginner',
        duration: '20 min',
        focus: 'Mobility',
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
