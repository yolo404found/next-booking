import { Schema, model, models, Document } from 'mongoose';

export interface IServiceProvider extends Document {
  providerName: string;
  email: string;
  phone?: string;
  address?: string;
}

 const serviceProviderSchema = new Schema<IServiceProvider>({
  providerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  address: { type: String }
});

const ServiceProvider = models.ServiceProvider || model<IServiceProvider>('ServiceProvider', serviceProviderSchema);
export default ServiceProvider;
