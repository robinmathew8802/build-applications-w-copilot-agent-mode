import { Document, Model } from 'mongoose';
export interface WorkoutDocument extends Document {
    name: string;
    focusArea: string;
    durationMinutes: number;
    difficulty: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Workout: Model<WorkoutDocument>;
//# sourceMappingURL=Workout.d.ts.map