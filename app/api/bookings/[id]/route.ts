import Booking from '@/src/models/Booking';
import { connectDB } from '@/src/utils/db';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const booking = await Booking.findById(params.id).populate('user');
  if (!booking) {
    return NextResponse.json({ success: false, message: 'Booking not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: booking });
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await request.json();
  const booking = await Booking.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
  if (!booking) {
    return NextResponse.json({ success: false, message: 'Booking not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: booking });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const booking = await Booking.findByIdAndDelete(params.id);
  if (!booking) {
    return NextResponse.json({ success: false, message: 'Booking not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: booking });
}
