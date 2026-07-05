"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("./config/database");
const routes_1 = __importDefault(require("./routes"));
const app = (0, express_1.default)();
const port = Number(process.env.PORT || 8000);
app.use(express_1.default.json());
app.use(routes_1.default);
app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
});
app.listen(port, () => {
    console.log(`OctoFit backend listening on port ${port}`);
});
