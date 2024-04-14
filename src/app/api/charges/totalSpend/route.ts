import { connectDB } from "@/libs/mongodb";
import { Charge } from "@/models";

export async function POST(req: Request) {
	await connectDB();

	const charges = await Charge.aggregate([
		{ $match: { active: true } },
		{ $group: { _id: null, totalSpend: { $sum: "$amount" } } },
	]);
	return Response.json(charges);
}
