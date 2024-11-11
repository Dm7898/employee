import mongoose from "mongoose";

// Custom validator for email pattern
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  image: {
    type: String,
    // default: "/uploads/profile.png",
    validate: {
      validator: function (v) {
        return /\.(jpg|jpeg|png)$/i.test(v); // Only allows .jpg, .jpeg, .png extensions
      },
      message: (props) =>
        `${props.value} is not a valid image format. Only jpg, jpeg, and png are allowed.`,
    },
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
    validate: {
      validator: function (v) {
        return emailRegex.test(v); // Validates email format
      },
      message: (props) => `${props.value} is not a valid email address`,
    },
  },
  mobile: {
    type: String, // Changed to String
    required: [true, "Mobile number is required"],
    minlength: 10,
    maxlength: 10,
    validate: {
      validator: function (v) {
        return /^[789]\d{9}$/.test(v); // Ensures 10 digits and starts with 7, 8, or 9
      },
      message: (props) =>
        `${props.value} is not a valid mobile number. It should contain 10 digits.`,
    },
  },
  designation: {
    type: String,
    enum: ["hr", "manager", "sales"],
    required: [true, "Designation must be selected"],
  },
  gender: {
    type: String,
    enum: ["male", "female"],
    required: [true, "Gender must be selected"],
  },
  courses: {
    type: [String],
    enum: ["mca", "bca", "bsc"],
    required: [true, "Course is required"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Ensuring email uniqueness
// employeeSchema.pre("save", async function (next) {
//   const employee = this;
//   const emailExists = await mongoose.models.Employee.findOne({
//     email: employee.email,
//   });
//   if (emailExists) {
//     throw new Error("Email already exists. Please use a different email.");
//   }
//   next();
// });

export default mongoose.model("Employee", employeeSchema);
