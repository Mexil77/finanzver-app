import mongoose from "mongoose";

export async function connectDB() {
	process.env.MONGODB_URI && (await mongoose.connect(process.env?.MONGODB_URI));
}
