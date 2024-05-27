import User from '@/src/models/User';
import { connectDB } from '@/src/utils/db';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request:NextRequest) {
  await connectDB();
  const type = request.nextUrl.searchParams.get("userType");
  let options = {} 
  if(type){
    options = {userType:type}
  }
  const users = await User.find(options);
  return NextResponse.json({ success: true, data: users });
}

export async function POST(request: NextRequest) {
  await connectDB();
  const body = await request.json();
  const user = await User.create(body);
  return NextResponse.json({ success: true, data: user }, { status: 201 });
}
