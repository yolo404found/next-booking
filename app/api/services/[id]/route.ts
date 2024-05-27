import Service from '@/src/models/Service';
import { connectDB } from '@/src/utils/db';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const service = await Service.findById(params.id).populate('serviceProvider').lean();
  if (!service) {
    return NextResponse.json({ success: false, message: 'Service not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: service });
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await request.json();
  const service = await Service.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
  if (!service) {
    return NextResponse.json({ success: false, message: 'Service not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: service });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const service = await Service.findByIdAndDelete(params.id);
  if (!service) {
    return NextResponse.json({ success: false, message: 'Service not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: service });
}
