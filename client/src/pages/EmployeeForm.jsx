import { useState } from "react";
import { api } from "../api";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const EmployeeForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("hr");
  const [gender, setGender] = useState("male");
  const [courses, setCourses] = useState([]);
  const [image, setImage] = useState(null);

  const handleCourseChange = (e) => {
    const value = e.target.value;
    setCourses((prevCourses) =>
      prevCourses.includes(value)
        ? prevCourses.filter((course) => course !== value)
        : [...prevCourses, value]
    );
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mobile validation for 10 digits, starting with 7, 8, or 9
    const mobileRegex = /^[789]\d{9}$/;
    if (!mobileRegex.test(mobile)) {
      alert("Please enter a valid mobile number starting with 7, 8, or 9.");
      return;
    }
    if (courses.length === 0) {
      alert("Please select at least one course.");
      return;
    }

    let formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("designation", designation);
    formData.append("gender", gender);
    courses.forEach((course) => formData.append("courses", course));
    if (image) formData.append("image", image);

    try {
      const response = await api.post("/api/employee/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      alert("employee created successfuly");
      navigate("/employee-list");
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading employee:", error);
    }
  };

  return (
    <Layout>
      <div className="p-6 m-auto bg-white rounded shadow-md w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
        <h2 className="text-xl text-center font-semibold mb-4">
          Employee Form
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <label className="block mb-2">
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full p-2 mt-1 border rounded"
            />
          </label>

          {/* Email */}
          <label className="block mb-2">
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 mt-1 border rounded"
            />
          </label>

          {/* Mobile */}
          <label className="block mb-2">
            Mobile No:
            <input
              type="tel"
              value={mobile}
              minLength={10}
              maxLength={10}
              onChange={(e) => setMobile(e.target.value)}
              required
              className="w-full p-2 mt-1 border rounded"
            />
          </label>

          {/* Designation Dropdown */}
          <label className="block mb-2">
            Designation:
            <select
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              className="w-full p-2 mt-1 border rounded"
            >
              <option value="hr">HR</option>
              <option value="manager">Manager</option>
              <option value="sales">Sales</option>
            </select>
          </label>

          {/* Gender Radio Buttons */}
          <fieldset className="mb-3">
            <legend>Gender:</legend>
            <label className="mr-4">
              <input
                type="radio"
                value="male"
                checked={gender === "male"}
                onChange={(e) => setGender(e.target.value)}
                className="mr-1"
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                value="female"
                checked={gender === "female"}
                onChange={(e) => setGender(e.target.value)}
                className="mr-1"
              />
              Female
            </label>
          </fieldset>

          {/* Course Checkboxes */}
          <fieldset className="mb-3 flex space-x-2 flex-wrap">
            <legend>Course:</legend>
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                value="mca"
                checked={courses.includes("mca")}
                onChange={handleCourseChange}
                className="mr-1"
              />
              MCA
            </label>
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                value="bca"
                checked={courses.includes("bca")}
                onChange={handleCourseChange}
                className="mr-1"
              />
              BCA
            </label>
            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                value="bsc"
                checked={courses.includes("bsc")}
                onChange={handleCourseChange}
                className="mr-1"
              />
              BSc
            </label>
          </fieldset>

          {/* Image Upload */}
          <label className="block mb-4">
            Image:
            <input type="file" onChange={handleImageChange} className="mt-1" />
          </label>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full p-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default EmployeeForm;
