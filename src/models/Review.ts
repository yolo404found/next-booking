import { Schema, model, models, Document } from 'mongoose';

interface IReview extends Document {
  user: Schema.Types.ObjectId;
  service: Schema.Types.ObjectId;
  rating: number;
  comment?: string;
  reviewDate: Date;
}

const reviewSchema = new Schema<IReview>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  service: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
  rating: { type: Number, min: 1, max: 5, required: true },
  comment: { type: String },
  reviewDate: { type: Date, default: Date.now }
});

const Review = models.Review || model<IReview>('Review', reviewSchema);
export default Review;
