import { Schema, models, model } from "mongoose";

const schema = new Schema({
	name: String,
	lastName: String,
	age: Number,
});

export default models?.User || model("User", schema);
