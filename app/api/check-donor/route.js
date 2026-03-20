import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db'; // your MongoDB connector
import Donor from '@/models/donorModel'; // your Mongoose model

export async function POST(req) {
  try {
    const { email } = await req.json();
    await connectDB();

    const donor = await Donor.findOne({ email });

    return NextResponse.json({ isDonor: !!donor });
  } catch (err) {
    console.error("Error checking donor:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
