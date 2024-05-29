import Payment from '@/src/models/Payment';
import { connectDB } from '@/src/utils/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const payments = await Payment.find({}).populate('booking').lean();
  return NextResponse.json({ success: true, data: payments });
}

export async function POST(request: NextRequest) {
  await connectDB();
  const body = await request.json();
  const payment = await Payment.create(body);
  return NextResponse.json({ success: true, data: payment }, { status: 201 });
}
