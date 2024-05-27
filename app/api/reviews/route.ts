import Review from '@/src/models/Review';
import { connectDB } from '@/src/utils/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const reviews = await Review.find({});
  return NextResponse.json({ success: true, data: reviews });
}

export async function POST(request: NextRequest) {
  await connectDB();
  const body = await request.json();
  const review = await Review.create(body);
  return NextResponse.json({ success: true, data: review }, { status: 201 });
}
