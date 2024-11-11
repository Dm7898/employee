import mongoose from "mongoose";
import Counter from "./Counter.js";

const userSchema = new mongoose.Schema({
  sno: {
    type: Number,
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
    enum: ["admin", "Customer"],
    default: "Customer",
    required: true,
  },
});

// Pre-save hook to auto-increment sno
userSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findOneAndUpdate(
      { name: "userSno" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.sno = counter.seq;
  }
  next();
});

export default mongoose.model("User", userSchema);
