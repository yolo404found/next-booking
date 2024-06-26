import { Schema, model, models, Document } from 'mongoose';

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  userType: 'Customer' | 'Admin' | 'ServiceProvider';
}

export interface User extends Omit<IUser, 'password'> {}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String },
  userType: { type: String, enum: ['Customer', 'Admin', 'ServiceProvider'], required: true }
});

const User = models?.User || model<IUser>('User', userSchema);
export default User;
