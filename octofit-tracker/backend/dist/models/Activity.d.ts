import { Document, Model, Types } from 'mongoose';
export interface ActivityDocument extends Document {
    user: Types.ObjectId;
    type: string;
    durationMinutes: number;
    caloriesBurned: number;
    date: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Activity: Model<ActivityDocument>;
//# sourceMappingURL=Activity.d.ts.map