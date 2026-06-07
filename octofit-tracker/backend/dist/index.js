"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const activities_1 = __importDefault(require("./routes/activities"));
const leaderboard_1 = __importDefault(require("./routes/leaderboard"));
const teams_1 = __importDefault(require("./routes/teams"));
const users_1 = __importDefault(require("./routes/users"));
const workouts_1 = __importDefault(require("./routes/workouts"));
const seed_1 = require("./scripts/seed");
const database_1 = require("./config/database");
const codespaceName = process.env.CODESPACE_NAME;
const API_BASE_URL = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
const PORT = Number(process.env.PORT) || 8000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/health', (_req, res) => {
    res.json({ status: 'ok', apiBaseUrl: API_BASE_URL });
});
app.get('/api/config', (_req, res) => {
    res.json({ apiBaseUrl: API_BASE_URL, port: PORT });
});
app.use('/api/users', users_1.default);
app.use('/api/teams', teams_1.default);
app.use('/api/activities', activities_1.default);
app.use('/api/workouts', workouts_1.default);
app.use('/api/leaderboard', leaderboard_1.default);
app.use((_req, res) => {
    res.status(404).json({ error: 'Route not found' });
});
async function start() {
    try {
        await (0, database_1.connectDatabase)();
        console.log(`Connected to MongoDB at ${database_1.MONGO_URL}`);
        await (0, seed_1.seedDatabase)();
        app.listen(PORT, () => {
            console.log(`Backend listening on port ${PORT}`);
            console.log(`API base URL: ${API_BASE_URL}`);
        });
    }
    catch (error) {
        console.error('Failed to start backend', error);
        process.exit(1);
    }
}
start();
//# sourceMappingURL=index.js.map