import mongoose from "mongoose";

const counterSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  seq: { type: Number, default: 1330 }, // Starting from 1330, so the next will be 1331
});

export default mongoose.model("Counter", counterSchema);
