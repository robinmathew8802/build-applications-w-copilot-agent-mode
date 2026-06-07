import { Document, Model, Types } from 'mongoose';
export interface UserDocument extends Document {
    name: string;
    email: string;
    team?: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export declare const User: Model<UserDocument>;
//# sourceMappingURL=User.d.ts.map