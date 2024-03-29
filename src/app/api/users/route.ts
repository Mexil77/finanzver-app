import { NextResponse } from "next/server";
import { connectDB } from "@/libs/mongodb";
import { User } from "@/models";

export async function GET() {
	await connectDB();

	const users = await User.find();
	return NextResponse.json({ code: 200, data: users });
}
