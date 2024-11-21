import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { api } from "../api";
import Layout from "../components/Layout";
import { CoursesContext } from "../CoursesContext"; // Import CoursesContext

const EmployeeList = () => {
  const { courses } = useContext(CoursesContext); // Access courses from the context
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/employee/list");
        setEmployees(response.data);
        setFilteredEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    const filtered = employees.filter((employee) =>
      employee.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setFilteredEmployees(filtered);
  };

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      await api.delete(`http://localhost:5000/api/employee/delete/${id}`);
      setEmployees(employees.filter((employee) => employee._id !== id));
      setFilteredEmployees(
        filteredEmployees.filter((employee) => employee._id !== id)
      );
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  // Function to map course IDs to course names
  const getCourseNames = (courseIds) => {
    return courseIds.map((courseId) => {
      const course = courses.find((course) => course._id === courseId);
      return course ? course.course : "Unknown Course"; // Fallback to "Unknown Course" if not found
    });
  };

  return (
    <Layout>
      <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-4 space-y-4 sm:space-y-0">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-700">
            Employee List
          </h1>
          <Link
            to="/create-employee"
            className="px-4 py-2 text-sm sm:text-base text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Create Employee
          </Link>
        </div>
        {!loading && (
          <div className="flex flex-col lg:flex-row justify-between items-center">
            <input
              type="text"
              placeholder="Search by name..."
              value={searchQuery}
              onChange={handleSearch}
              className="mb-4 p-2 border rounded w-full sm:w-1/2 lg:w-1/3"
            />
            <div className="font-bold">
              Total Count: {filteredEmployees.length}
            </div>
          </div>
        )}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="loader">Loading...</div>
          </div>
        ) : filteredEmployees.length > 0 ? (
          <div className="overflow-auto rounded-lg shadow">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-2 text-left font-semibold text-gray-600 text-xs sm:text-sm border-b">
                    ID
                  </th>
                  <th className="p-2 text-left font-semibold text-gray-600 text-xs sm:text-sm border-b">
                    Image
                  </th>
                  <th className="p-2 text-left font-semibold text-gray-600 text-xs sm:text-sm border-b">
                    Name
                  </th>
                  <th className="p-2 text-left font-semibold text-gray-600 text-xs sm:text-sm border-b">
                    Email
                  </th>
                  <th className="p-2 text-left font-semibold text-gray-600 text-xs sm:text-sm border-b">
                    Mobile No
                  </th>
                  <th className="p-2 text-left font-semibold text-gray-600 text-xs sm:text-sm border-b">
                    Designation
                  </th>
                  <th className="p-2 text-left font-semibold text-gray-600 text-xs sm:text-sm border-b">
                    Gender
                  </th>
                  <th className="p-2 text-left font-semibold text-gray-600 text-xs sm:text-sm border-b">
                    Courses
                  </th>
                  <th className="p-2 text-left font-semibold text-gray-600 text-xs sm:text-sm border-b">
                    Created Date
                  </th>
                  <th className="p-2 text-left font-semibold text-gray-600 text-xs sm:text-sm border-b">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr
                    key={employee._id}
                    className="hover:bg-gray-100 text-xs sm:text-sm"
                  >
                    <td className="p-2 border-b">{employee._id}</td>
                    <td className="p-2 border-b">
                      <img
                        src={`http://localhost:5000${employee.image}`}
                        alt={employee.name}
                        className="w-12 h-12 object-cover rounded-full"
                      />
                    </td>
                    <td className="p-2 border-b">{employee.name}</td>
                    <td className="p-2 border-b">{employee.email}</td>
                    <td className="p-2 border-b">{employee.mobile}</td>
                    <td className="p-2 border-b">{employee.designation}</td>
                    <td className="p-2 border-b capitalize">
                      {employee.gender}
                    </td>
                    <td className="p-2 border-b">
                      {/* Map the course IDs to course names */}
                      {getCourseNames(employee.courses).join(", ")}
                    </td>
                    <td className="p-2 border-b">
                      {new Date(employee.createdAt).toLocaleDateString()}
                    </td>
                    <td className="p-2 border-b">
                      <div className="flex gap-2">
                        <Link
                          to={`/edit-employee/${employee._id}`}
                          className="px-2 py-1 text-white bg-green-500 rounded hover:bg-green-600 text-xs sm:text-sm"
                        >
                          Edit
                        </Link>
                        <button
                          onClick={() => handleDelete(employee._id)}
                          className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600 text-xs sm:text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center text-gray-500 mt-10">
            No employee data found
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EmployeeList;
