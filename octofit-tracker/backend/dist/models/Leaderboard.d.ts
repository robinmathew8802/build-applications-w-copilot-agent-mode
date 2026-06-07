import { Document, Model, Types } from 'mongoose';
export interface LeaderboardEntryDocument extends Document {
    user: Types.ObjectId;
    rank: number;
    score: number;
    createdAt: Date;
    updatedAt: Date;
}
export declare const LeaderboardEntry: Model<LeaderboardEntryDocument>;
//# sourceMappingURL=Leaderboard.d.ts.map