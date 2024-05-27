import Service from '@/src/models/Service';
import { connectDB } from '@/src/utils/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const services = await Service.find({}).populate('serviceProvider').lean();
  return NextResponse.json({ success: true, data: services });
}

export async function POST(request: NextRequest) {
  await connectDB();
  const body = await request.json();
  const service = await Service.create(body);
  return NextResponse.json({ success: true, data: service }, { status: 201 });
}
