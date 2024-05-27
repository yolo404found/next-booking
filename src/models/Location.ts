import { Schema, model, models, Document } from 'mongoose';

interface ILocation extends Document {
  locationName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface Location extends Omit<ILocation, "">{}

const locationSchema = new Schema<ILocation>({
  locationName: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  zipCode: { type: String, required: true },
  country: { type: String, required: true }
});

const Location = models.Location || model<ILocation>('Location', locationSchema);
export default Location;
