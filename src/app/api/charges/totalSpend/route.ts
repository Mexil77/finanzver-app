import { connectDB } from "@/libs/mongodb";
import { Charge } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
	await connectDB();

	const charges = await Charge.aggregate([
		{ $match: { active: true } },
		{ $group: { _id: null, totalSpend: { $sum: "$amount" } } },
	]);
	return NextResponse.json(charges);
}
