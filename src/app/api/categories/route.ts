import { connectDB } from "@/libs/mongodb";
import { Category } from "@/models";
import { NextRequest, NextResponse } from "next/server";

interface RequestParams {
	parent?: string | null;
}

export async function GET(request: NextRequest) {
	await connectDB();

	let requestParams: RequestParams = {};
	if (request.nextUrl.searchParams.get("parent") !== "")
		requestParams.parent = request.nextUrl.searchParams.get("parent");

	const categories = await Category.find(requestParams);
	return NextResponse.json(categories);
}

export async function POST(request: NextRequest) {
	await connectDB();

	const data = await request.json();
	if (data.parent === "") delete data.parent;

	const categoryCreated = await Category.create(data);
	return NextResponse.json(categoryCreated);
}
