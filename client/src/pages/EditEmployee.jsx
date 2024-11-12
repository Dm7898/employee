import { useState, useEffect, useRef, useContext } from "react";
import { api } from "../api";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import { CoursesContext } from "../CoursesContext"; // Import CoursesContext

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const initialEmployeeData = useRef(null);

  // Access the courses from context
  const { courses } = useContext(CoursesContext);

  // Fetch employee data when component mounts
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await api.get(
          `http://localhost:5000/api/employee/${id}`
        );
        setEmployee(response.data);
        setSelectedCourses(response.data.courses);
        initialEmployeeData.current = response.data;
      } catch (err) {
        setError("Error fetching employee details");
        console.error("Error fetching details", err);
      } finally {
        setLoading(false);
      }
    };
    fetchEmployee();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedCourses.length === 0) {
      alert("Please select at least one course.");
      return;
    }

    // Check if there are any changes made
    const isChanged = Object.keys(employee).some(
      (key) =>
        key !== "image" &&
        key !== "courses" && // Skip the courses field for comparison
        employee[key] !== initialEmployeeData.current[key]
    );

    // Compare selected courses with initial courses
    const isCoursesChanged =
      JSON.stringify(selectedCourses) !==
      JSON.stringify(initialEmployeeData.current.courses);

    if (!isChanged && !isCoursesChanged && image === null) {
      alert("No changes were made.");
      return;
    }

    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("mobile", employee.mobile);
    formData.append("designation", employee.designation);
    formData.append("gender", employee.gender);
    formData.append("courses", selectedCourses); // Include the selected courses
    if (image) {
      formData.append("image", image);
    }

    try {
      await api.patch(`/api/employee/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Employee updated successfully");
      navigate("/employee-list");
    } catch (err) {
      setError("Error updating employee");
      console.error("Error updating details", err);
    }
  };

  // Handle form changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const updatedCourses = checked
        ? [...selectedCourses, value]
        : selectedCourses.filter((course) => course !== value);
      setSelectedCourses(updatedCourses);
    } else {
      setEmployee((prevEmployee) => ({
        ...prevEmployee,
        [name]: value,
      }));
    }
  };

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  if (loading) return <div className="text-center p-4">Loading...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;

  return (
    <Layout>
      <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">
          Edit Employee
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={employee.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Image
            </label>
            <div className="flex flex-col items-center sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mt-1">
              {employee?.image && (
                <div>
                  <img
                    src={`http://localhost:5000${employee.image}`} // Adjust URL as needed
                    alt="Current Profile"
                    className="w-20 h-20 object-cover rounded-full border border-gray-300"
                  />
                </div>
              )}
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                className="focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={employee.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Mobile Field */}
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Mobile
            </label>
            <input
              type="text"
              name="mobile"
              minLength={10}
              maxLength={10}
              value={employee.mobile}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Designation Dropdown */}
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Designation
            </label>
            <select
              name="designation"
              value={employee.designation}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="hr">HR</option>
              <option value="manager">Manager</option>
              <option value="sales">Sales</option>
            </select>
          </div>

          {/* Gender (Radio Buttons) */}
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Gender
            </label>
            <div className="flex flex-col sm:flex-row sm:space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={employee.gender === "male"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Male
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={employee.gender === "female"}
                  onChange={handleChange}
                  className="mr-2"
                />
                Female
              </label>
            </div>
          </div>

          {/* Courses (Checkboxes) */}
          <fieldset className="mb-3 flex space-x-2 flex-wrap">
            <legend>Course:</legend>
            {courses.length === 0 ? (
              <p>Loading courses...</p>
            ) : (
              courses.map((item) => (
                <label
                  key={item._id}
                  className="inline-flex items-center space-x-2"
                >
                  <input
                    type="checkbox"
                    name="courses"
                    value={item._id}
                    checked={selectedCourses.includes(item._id)}
                    onChange={handleChange}
                    className="w-5 h-5 border-gray-300 rounded"
                  />
                  <span>{item.course}</span>
                </label>
              ))
            )}
          </fieldset>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default EditEmployee;
