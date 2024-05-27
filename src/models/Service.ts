import { Schema, model, models, Document } from 'mongoose';
import { ServiceProvider } from './ServiceProvider';

interface IService extends Document {
  serviceName: string;
  description?: string;
  price: number;
  serviceProvider: Schema.Types.ObjectId;
}

export interface Service extends Omit<IService,'serviceProvider'>{
  serviceProvider:ServiceProvider | string
}

const serviceSchema = new Schema<IService>({
  serviceName: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  serviceProvider: { type: Schema.Types.ObjectId, ref: 'ServiceProvider', required: true }
});

const Service = models.Service || model<IService>('Service', serviceSchema);
export default Service;
