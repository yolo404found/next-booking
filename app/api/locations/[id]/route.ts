import Location from '@/src/models/Location';
import { connectDB } from '@/src/utils/db';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const location = await Location.findById(params.id);
  if (!location) {
    return NextResponse.json({ success: false, message: 'Location not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: location });
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await request.json();
  const location = await Location.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
  if (!location) {
    return NextResponse.json({ success: false, message: 'Location not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: location });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const location = await Location.findByIdAndDelete(params.id);
  if (!location) {
    return NextResponse.json({ success: false, message: 'Location not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: location });
}
