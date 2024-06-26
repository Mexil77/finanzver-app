import { Schema, models, model } from "mongoose";

const schema = new Schema(
	{
		category: { type: Schema.Types.ObjectId, ref: "Category" },
		name: String,
		amount: { type: Number, min: 0 },
		active: { type: Boolean, default: true },
	},
	{
		timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
	}
);

export default models.Charge || model("Charge", schema);
