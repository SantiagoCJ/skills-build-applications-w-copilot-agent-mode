"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const mongoose_1 = require("mongoose");
const activitySchema = new mongoose_1.Schema({
    type: { type: String, required: true },
    duration: { type: String, required: true },
    calories: { type: Number, required: true },
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });
exports.Activity = (0, mongoose_1.model)('Activity', activitySchema);
