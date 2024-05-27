import { Schema, model, models, Document } from 'mongoose';

export interface IService extends Document {
  serviceName: string;
  description?: string;
  price: number;
  serviceProvider: Schema.Types.ObjectId;
}

const serviceSchema = new Schema<IService>({
  serviceName: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  serviceProvider: { type: Schema.Types.ObjectId, ref: 'ServiceProvider', required: true }
});

const Service = models.Service || model<IService>('Service', serviceSchema);
export default Service;
