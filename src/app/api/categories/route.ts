import { connectDB } from "@/libs/mongodb";
import { Category } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	await connectDB();

	const categories = await Category.find();
	return NextResponse.json(categories);
}

export async function POST(request: NextRequest) {
	await connectDB();

	const data = await request.json();

	const categoryCreated = await Category.create(data);
	return NextResponse.json(categoryCreated);
}
