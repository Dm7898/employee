import mongoose from "mongoose";
import Counter from "./Counter.js";

const courseSchema = new mongoose.Schema({
  sno: {
    type: Number,
    unique: true,
  },
  course: {
    type: String,
    lowercase: true,
    unique: true,
    required: [true, "Course Must should have"],
  },
});

// Pre-save hook to auto-increment sno
courseSchema.pre("save", async function (next) {
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

export default mongoose.model("Course", courseSchema);
