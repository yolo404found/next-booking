import { Schema, model, models, Document } from 'mongoose';

interface IBooking extends Document {
  user: Schema.Types.ObjectId;
  service: Schema.Types.ObjectId;
  bookingDate: Date;
  startTime: Date;
  endTime: Date;
  status: 'Pending' | 'Confirmed' | 'Cancelled';
  totalPrice: number;
}

const bookingSchema = new Schema<IBooking>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  bookingDate: { type: Date, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], required: true },
  totalPrice: { type: Number, required: true }
});

const Booking = models?.Booking || model<IBooking>('Booking', bookingSchema);
export default Booking;
