import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CoursesContext } from "../CoursesContext"; // Import the CoursesContext to get the list of courses
import Layout from "../components/Layout";
import { api } from "../api"; // Adjust according to your API setup

const EmployeeForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [designation, setDesignation] = useState("hr");
  const [gender, setGender] = useState("male");
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [image, setImage] = useState(null);

  // Fetch courses from the context
  const { courses } = useContext(CoursesContext);

  // Fetch employee details if editing
  useEffect(() => {
    if (id) {
      const fetchEmployeeDetails = async () => {
        try {
          const response = await api.get(`/api/employee/${id}`);
          const employee = response.data;
          setName(employee.name);
          setEmail(employee.email);
          setMobile(employee.mobile);
          setDesignation(employee.designation);
          setGender(employee.gender);
          setSelectedCourses(employee.courses); // Pre-select courses if editing
        } catch (error) {
          console.error("Error fetching employee details:", error);
        }
      };
      fetchEmployeeDetails();
    }
  }, [id]);

  const handleCourseChange = (e) => {
    const value = e.target.value;
    const selectedCourse = courses.find((course) => course._id === value);

    setSelectedCourses((prevCourses) => {
      if (prevCourses.includes(selectedCourse)) {
        return prevCourses.filter(
          (course) => course._id !== selectedCourse._id
        );
      } else {
        return [...prevCourses, selectedCourse];
      }
    });
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mobileRegex = /^[789]\d{9}$/;
    if (!mobileRegex.test(mobile)) {
      alert("Please enter a valid mobile number starting with 7, 8, or 9.");
      return;
    }
    if (selectedCourses.length === 0) {
      alert("Please select at least one course.");
      return;
    }

    let formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("mobile", mobile);
    formData.append("designation", designation);
    formData.append("gender", gender);
    selectedCourses.forEach((course) => formData.append("courses", course._id)); // Use course _id
    if (image) formData.append("image", image);

    try {
      if (id) {
        await api.put(`/api/employee/update/${id}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Employee updated successfully");
      } else {
        await api.post("/api/employee/create", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        alert("Employee created successfully");
      }
      navigate("/employee-list");
    } catch (error) {
      console.error("Error submitting employee:", error);
    }
  };

  return (
    <Layout>
      <div className="p-6 m-auto bg-white rounded shadow-md w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
        <h2 className="text-xl text-center font-semibold mb-4">
          {id ? "Edit Employee" : "Create Employee"}
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
            {courses.length === 0 ? (
              <p>Loading courses...</p>
            ) : (
              courses.map((item) => (
                <label key={item._id} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    value={item._id} // Use _id here instead of course name
                    checked={selectedCourses.some(
                      (course) => course._id === item._id
                    )} // Check if course is selected
                    onChange={handleCourseChange}
                    className="mr-1"
                  />
                  {item.course[0].toUpperCase() + item.course.slice(1)}
                </label>
              ))
            )}
          </fieldset>

          {/* Image Upload */}
          <label className="block mb-2">
            Image:
            <input
              type="file"
              onChange={handleImageChange}
              className="w-full p-2 mt-1"
            />
          </label>

          <button
            type="submit"
            className="w-full p-2 bg-blue-600 text-white rounded"
          >
            {id ? "Update Employee" : "Create Employee"}
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default EmployeeForm;
