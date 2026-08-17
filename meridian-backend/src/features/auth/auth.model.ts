import  mongoose, { Document, Schema } from "mongoose";


export interface IUser extends Document {
  fullName: string;
  email: string;
  password: string;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  fullName: {type: String, required: true},
  email: {type: String, required: true, unique: true, lowercase: true},
  password: {type: String, required: true},
  isVerified: {type: Boolean, default: false}
}, {timestamps: true});

export const User = mongoose.model<IUser>("User", UserSchema);