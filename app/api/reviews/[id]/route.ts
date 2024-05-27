import Review from '@/src/models/Review';
import { connectDB } from '@/src/utils/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const review = await Review.findById(params.id);
  if (!review) {
    return NextResponse.json({ success: false, message: 'Review not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: review });
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await request.json();
  const review = await Review.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
  if (!review) {
    return NextResponse.json({ success: false, message: 'Review not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: review });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const review = await Review.findByIdAndDelete(params.id);
  if (!review) {
    return NextResponse.json({ success: false, message: 'Review not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: review });
}
