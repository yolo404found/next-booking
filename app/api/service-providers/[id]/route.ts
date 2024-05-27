import ServiceProvider from '@/src/models/ServiceProvider';
import { connectDB } from '@/src/utils/db';
import { NextRequest, NextResponse } from 'next/server';


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const serviceProvider = await ServiceProvider.findById(params.id);
  if (!serviceProvider) {
    return NextResponse.json({ success: false, message: 'ServiceProvider not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: serviceProvider });
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const body = await request.json();
  const serviceProvider = await ServiceProvider.findByIdAndUpdate(params.id, body, { new: true, runValidators: true });
  if (!serviceProvider) {
    return NextResponse.json({ success: false, message: 'ServiceProvider not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: serviceProvider });
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  await connectDB();
  const serviceProvider = await ServiceProvider.findByIdAndDelete(params.id);
  if (!serviceProvider) {
    return NextResponse.json({ success: false, message: 'ServiceProvider not found' }, { status: 404 });
  }
  return NextResponse.json({ success: true, data: serviceProvider });
}
