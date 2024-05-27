import Payment from '@/src/models/Payment';
import { connectDB } from '@/src/utils/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const payment = await Payment.findById(params.id);
  if (!payment) {
    return NextResponse.json({ success: false, message: 'Payment not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: payment });
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await request.json();
  const payment = await Payment.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
  if (!payment) {
    return NextResponse.json({ success: false, message: 'Payment not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: payment });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const payment = await Payment.findByIdAndDelete(params.id);
  if (!payment) {
    return NextResponse.json({ success: false, message: 'Payment not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: payment });
}
