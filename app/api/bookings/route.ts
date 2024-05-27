import Booking from '@/src/models/Booking';
import { connectDB } from '@/src/utils/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const bookings = await Booking.find({}).populate('user');
  return NextResponse.json({ success: true, data: bookings });
}

export async function POST(request: NextRequest) {
  await connectDB();
  const body = await request.json();
  const booking = await Booking.create(body);
  return NextResponse.json({ success: true, data: booking }, { status: 201 });
}
