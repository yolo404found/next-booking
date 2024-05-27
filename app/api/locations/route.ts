import Location from '@/src/models/Location';
import { connectDB } from '@/src/utils/db';
import { NextRequest, NextResponse } from 'next/server';


export async function GET() {
  await connectDB();
  const locations = await Location.find({});
  return NextResponse.json({ success: true, data: locations });
}

export async function POST(request: NextRequest) {
  await connectDB();
  const body = await request.json();
  const location = await Location.create(body);
  return NextResponse.json({ success: true, data: location }, { status: 201 });
}
