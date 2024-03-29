import { connectDB } from "@/libs/mongodb";
import { Charge } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	await connectDB();

	const charges = await Charge.find();
	return NextResponse.json({ code: 200, data: charges });
}

export async function POST(request: NextRequest) {
	await connectDB();

	const data = await request.json();

	const chargeCreated = await Charge.create(data);
	return NextResponse.json(chargeCreated);
}
