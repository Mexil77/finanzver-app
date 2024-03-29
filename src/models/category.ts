import { Schema, model, models } from "mongoose";

const schema = new Schema(
	{
		name: String,
		father: { type: Schema.Types.ObjectId, ref: "Category" },
		mandatorySpend: Boolean,
		color: String,
		budget: { type: Number, min: 0 },
		level: { type: Number, min: 0 },
	},
	{
		timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
	}
);

export default models?.Category || model("Category", schema);
