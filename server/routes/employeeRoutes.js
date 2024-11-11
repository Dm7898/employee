import express from "express";
import multer from "multer";
import {
  createEmployee,
  getEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employeeController.js";
import { upload } from "../controllers/employeeController.js";

const router = express.Router();

// Route to create a new employee
router.post("/create", upload.single("image"), createEmployee);

// Route to get all employees
router.get("/list", getEmployees);
router.get("/:id", getEmployeeById);
router.patch("/update/:id", upload.single("image"), updateEmployee); // PATCH: Update an employee by ID
router.delete("/delete/:id", deleteEmployee);

export default router;
