import User from '@/src/models/User';
import { connectDB } from '@/src/utils/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  await connectDB();
  const users = await User.find({});
  return NextResponse.json({ success: true, data: users });
}

export async function POST(request: NextRequest) {
  await connectDB();
  const body = await request.json();
  const user = await User.create(body);
  return NextResponse.json({ success: true, data: user }, { status: 201 });
}
