import { Document, Model, Types } from 'mongoose';
export interface TeamDocument extends Document {
    name: string;
    members: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}
export declare const Team: Model<TeamDocument>;
//# sourceMappingURL=Team.d.ts.map