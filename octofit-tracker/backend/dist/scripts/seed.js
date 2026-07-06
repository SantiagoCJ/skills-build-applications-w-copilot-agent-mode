"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../models/user");
const team_1 = require("../models/team");
const activity_1 = require("../models/activity");
const leaderboard_1 = require("../models/leaderboard");
const workout_1 = require("../models/workout");
const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
    try {
        await mongoose_1.default.connect(connectionString);
        console.log('Connected to octofit_db');
        await Promise.all([
            user_1.User.deleteMany({}),
            team_1.Team.deleteMany({}),
            activity_1.Activity.deleteMany({}),
            leaderboard_1.LeaderboardEntry.deleteMany({}),
            workout_1.Workout.deleteMany({}),
        ]);
        const users = await user_1.User.insertMany([
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
        const teams = await team_1.Team.insertMany([
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
        await activity_1.Activity.insertMany([
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
        await leaderboard_1.LeaderboardEntry.insertMany([
            { user: users[0]._id, score: 1280, rank: 1 },
            { user: users[1]._id, score: 1180, rank: 2 },
            { user: users[2]._id, score: 980, rank: 3 },
        ]);
        await workout_1.Workout.insertMany([
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
        await mongoose_1.default.disconnect();
    }
    catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}
seedDatabase();
