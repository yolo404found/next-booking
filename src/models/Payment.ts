import { Schema, model, models, Document } from 'mongoose';

interface IPayment extends Document {
  booking: Schema.Types.ObjectId;
  paymentDate: Date;
  amount: number;
  paymentMethod: 'Credit Card' | 'PayPal';
  status: 'Paid' | 'Pending' | 'Failed';
}

const paymentSchema = new Schema<IPayment>({
  booking: { type: Schema.Types.ObjectId, ref: 'Booking', required: true },
  paymentDate: { type: Date, required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['Credit Card', 'PayPal'], required: true },
  status: { type: String, enum: ['Paid', 'Pending', 'Failed'], required: true }
});

const Payment = models?.Payment || model<IPayment>('Payment', paymentSchema);
export default Payment;
