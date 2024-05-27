import User from '@/src/models/User';
import { connectDB } from '@/src/utils/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const user = await User.findById(params.id);
  if (!user) {
    return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: user });
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await request.json();
  const user = await User.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
  if (!user) {
    return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: user });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const user = await User.findByIdAndDelete(params.id);
  if (!user) {
    return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: user });
}
