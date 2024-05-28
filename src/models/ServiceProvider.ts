import { Schema, model, models, Document, ObjectId } from 'mongoose';
import { User } from './User';

interface IServiceProvider extends Document {
  providerName: string;
  email: string;
  phone?: string;
  address?: string;
  user:Schema.Types.ObjectId
}

export interface ServiceProvider extends Omit<IServiceProvider,"user">{
 user : User | string
}

 const serviceProviderSchema = new Schema<IServiceProvider>({
  providerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  address: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const ServiceProvider = models?.ServiceProvider || model<IServiceProvider>('ServiceProvider', serviceProviderSchema);
export default ServiceProvider;
