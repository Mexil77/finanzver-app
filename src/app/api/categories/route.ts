import { connectDB } from "@/libs/mongodb";
import { Categorie } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	await connectDB();

	const categories = await Categorie.find();
	return NextResponse.json({ code: 200, data: categories });
}

export async function POST(request: NextRequest) {
	await connectDB();

	const data = await request.json();

	const categorieCreated = await Categorie.create(data);
	return NextResponse.json(categorieCreated);
}
