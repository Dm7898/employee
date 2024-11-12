import express from "express";
import {
  createCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
} from "../controllers/courseController.js";

const router = express.Router();

router.post("/add", createCourse);
router.get("/all", getAllCourses);
router.put("/update/:id", updateCourse);

router.delete("/delete/:id", deleteCourse);

export default router;
