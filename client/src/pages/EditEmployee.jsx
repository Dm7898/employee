import { useState, useEffect, useRef } from "react";
import { api } from "../api";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const EditEmployee = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const initialEmployeeData = useRef(null);

  // Fetch employee data when component mounts
  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await api.get(
          `http://localhost:5000/api/employee/${id}`
        );
        setEmployee(response.data);
        initialEmployeeData.current = response.data; // Store initial data
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

    // Check if there are any changes made
    const isChanged = Object.keys(employee).some(
      (key) =>
        key !== "image" && employee[key] !== initialEmployeeData.current[key]
    );
    if (!isChanged && image === null) {
      alert("No changes were made.");
      return;
    }

    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("email", employee.email);
    formData.append("mobile", employee.mobile);
    formData.append("designation", employee.designation);
    formData.append("gender", employee.gender);
    formData.append("courses", employee.courses);
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
      setEmployee((prevEmployee) => {
        const updatedCourses = checked
          ? [...prevEmployee.courses, value]
          : prevEmployee.courses.filter((course) => course !== value);
        return { ...prevEmployee, [name]: updatedCourses };
      });
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
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Courses
            </label>
            <div className="flex flex-wrap space-x-4">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="courses"
                  value="mca"
                  checked={employee.courses.includes("mca")}
                  onChange={handleChange}
                  className="mr-2"
                />
                MCA
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="courses"
                  value="bca"
                  checked={employee.courses.includes("bca")}
                  onChange={handleChange}
                  className="mr-2"
                />
                BCA
              </label>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="courses"
                  value="bsc"
                  checked={employee.courses.includes("bsc")}
                  onChange={handleChange}
                  className="mr-2"
                />
                BSc
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              type="submit"
              className="w-full px-6 py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
