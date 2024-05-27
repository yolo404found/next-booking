import ServiceProvider from '@/src/models/ServiceProvider';
import { connectDB } from '@/src/utils/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const serviceProviders = await ServiceProvider.find({});
  return NextResponse.json({ success: true, data: serviceProviders });
}

export async function POST(request: NextRequest) {
  await connectDB();
  const body = await request.json();
  const serviceProvider = await ServiceProvider.create(body);
  return NextResponse.json({ success: true, data: serviceProvider }, { status: 201 });
}
