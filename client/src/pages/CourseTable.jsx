import { useState, useContext } from "react";
import { CoursesContext } from "../CoursesContext";
import Layout from "../components/Layout";

const CourseTable = () => {
  const { courses, createCourse, updateCourse, deleteCourse, loading } =
    useContext(CoursesContext);
  const [courseName, setCourseName] = useState("");
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [editingCourseName, setEditingCourseName] = useState("");

  const handleCreateCourse = () => {
    createCourse(courseName);
    setCourseName("");
  };

  const handleSaveEditCourse = () => {
    updateCourse(editingCourseId, editingCourseName);
    setEditingCourseId(null);
    setEditingCourseName("");
  };

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="mb-4">
          <input
            type="text"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            placeholder="Enter course name"
            className="border px-4 py-2 rounded"
          />
          <button
            onClick={handleCreateCourse}
            className="bg-blue-500 text-white py-2 px-4 rounded ml-2"
            disabled={loading}
          >
            Create Course
          </button>
        </div>

        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">ID</th>
              <th className="border px-4 py-2">Course Name</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id}>
                <td className="border px-4 py-2">{course._id}</td>
                <td className="border px-4 py-2">
                  {editingCourseId === course._id ? (
                    <input
                      type="text"
                      value={editingCourseName}
                      onChange={(e) => setEditingCourseName(e.target.value)}
                      className="border px-2 py-1 rounded"
                    />
                  ) : (
                    course.course
                  )}
                </td>
                <td className="border px-4 py-2">
                  {editingCourseId === course._id ? (
                    <button
                      onClick={handleSaveEditCourse}
                      className="bg-green-500 text-white py-1 px-2 rounded"
                    >
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          setEditingCourseId(course._id);
                          setEditingCourseName(course.course);
                        }}
                        className="bg-green-500 text-white py-1 px-2 rounded mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteCourse(course._id)}
                        className="bg-red-500 text-white py-1 px-2 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default CourseTable;
