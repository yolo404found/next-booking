import { Schema, model, models, Document } from 'mongoose';
import { Service } from './Service';
import { User } from './User';

interface IReview extends Document {
  user: Schema.Types.ObjectId;
  service: Schema.Types.ObjectId;
  rating: number;
  comment?: string;
  reviewDate: Date;
}

export interface Review extends Omit<IReview,"user"|"service">{
  user:User | string,
  service:Service | string
}

const reviewSchema = new Schema<IReview>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  reviewDate: { type: Date, default: Date.now }
});

const Review = models?.Review || model<IReview>('Review', reviewSchema);
export default Review;
