import { Schema, model, models, Document } from "mongoose";
import { User } from "./User";
import { Service } from "./Service";

interface IBooking extends Document {
  user: Schema.Types.ObjectId;
  service: Schema.Types.ObjectId;
  bookingDate: Date;
  startTime: string;
  endTime: string;
  status: "Pending" | "Confirmed" | "Cancelled";
  totalPrice: number;
  bookingNo: string;
}

export interface Booking extends Omit<IBooking, "user" | "service"> {
  user: User | string;
  service: Service | string;
}

const bookingSchema = new Schema<IBooking>({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  service: { type: Schema.Types.ObjectId, ref: "Service", required: true },
  bookingDate: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: false },
  status: {
    type: String,
    enum: ["Pending", "Confirmed", "Cancelled"],
    required: true,
  },
  bookingNo: { type: String, required: true },
  totalPrice: { type: Number, required: true },
});

const Booking = models?.Booking || model<IBooking>("Booking", bookingSchema);
export default Booking;
