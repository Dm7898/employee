import Course from "../models/Course.js";
import mongoose from "mongoose";

// Create a new course
export const createCourse = async (req, res) => {
  const { course } = req.body;
  try {
    const existingCourse = await Course.findOne({ course });
    if (existingCourse) {
      return res.status(400).json({ msg: "Course already exists" });
    }

    const newCourse = new Course({ course });
    await newCourse.save();

    res.status(201).json(newCourse);
  } catch (err) {
    console.error("Encountered error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    console.log(courses);
    res.status(200).json(courses);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update an existing course
export const updateCourse = async (req, res) => {
  const { id } = req.params;
  const { course } = req.body;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid course ID" });
    }

    const existingCourse = await Course.findById(id);
    if (!existingCourse) {
      return res.status(404).json({ msg: "Course not found" });
    }

    const duplicateCourse = await Course.findOne({ course });
    if (duplicateCourse && duplicateCourse._id.toString() !== id) {
      return res
        .status(400)
        .json({ msg: "Course with this name already exists" });
    }

    // Update course details
    existingCourse.course = course;
    const updatedCourse = await existingCourse.save();

    res.status(200).json(updatedCourse);
  } catch (err) {
    console.error("Encountered error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a course
export const deleteCourse = async (req, res) => {
  const { id } = req.params;

  try {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ msg: "Invalid course ID" });
    }

    const course = await Course.findById(id);
    if (!course) {
      return res.status(404).json({ msg: "Course not found" });
    }

    await course.deleteOne();
    res.status(200).json({ msg: "Course deleted successfully" });
  } catch (err) {
    console.error("Encountered error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
