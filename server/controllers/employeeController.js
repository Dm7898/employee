import multer from "multer";
import path from "path";
import Employee from "../models/Employee.js";
// import path from 'path';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../uploads/"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const filename = `${Date.now()}${ext}`;
    cb(null, filename);
  },
});

// File filter to only accept images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Invalid file type. Only JPEG, PNG, and JPG are allowed."),
      false
    );
  }
};

// Set up multer middleware
export const upload = multer({ storage, fileFilter });
// Controller function to create a new employee
export const createEmployee = async (req, res) => {
  const { name, email, mobile, designation, gender, courses } = req.body;
  const image = req.file
    ? `/uploads/${req.file.filename}`
    : "/uploads/profile.png";

  console.log(req.body, req.file); // Log the request body and file info

  // Check if any required fields are missing
  if (!name || !designation || !gender || !email || !mobile || !courses) {
    return res.status(400).json({
      message: "Missing required fields",
    });
  }

  try {
    const employee = new Employee({
      name,
      image,
      email,
      mobile,
      designation,
      gender,
      courses,
    });

    await employee.save();
    res.status(201).json({
      message: "Employee created successfully",
      employee,
    });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({
        message: "Email already exists. Please use a different email.",
      });
    } else {
      res.status(500).json({ message: "Server error", error });
    }
  }
};

// Controller function to get all employees
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    // console.log(employees);
    if (employees.length === 0) {
      return res.status(404).json({
        message: "No employee data yet created",
      });
    }
    res.status(200).json(employees);
  } catch (error) {
    console.error("Server error:", error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

// Controller function to update an employee's details
export const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : undefined; // Check if there's a new image
  console.log(req.body, req.file);
  if (image) {
    updates.image = image; // Add the image to the update object if a new file is uploaded
  }
  if (typeof updates.courses === "string") {
    updates.courses = updates.courses.split(",").map((course) => course.trim());
  }

  try {
    const employee = await Employee.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res
      .status(200)
      .json({ message: "Employee updated successfully", employee });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Controller function to delete an employee
export const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findByIdAndDelete(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  const { id } = req.params;

  try {
    const employee = await Employee.findById(id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
