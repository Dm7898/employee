import { createContext, useState, useEffect } from "react";
import { api } from "./api";

export const CoursesContext = createContext();

export const CoursesProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch courses from the API
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true);
        const response = await api.get("/api/course/all");
        setCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Add a new course
  const createCourse = async (courseName) => {
    if (!courseName.trim()) {
      console.error("Course name cannot be empty.");
      return;
    }
    setLoading(true);
    try {
      const response = await api.post("/api/course/add", {
        course: courseName.trim(),
      });
      setCourses((prevCourses) => [...prevCourses, response.data]);
    } catch (error) {
      console.error("Error creating course:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Update a course
  const updateCourse = async (id, updatedName) => {
    if (!updatedName.trim()) {
      console.error("Course name cannot be empty.");
      return;
    }
    setLoading(true);
    try {
      const response = await api.put(`/api/course/update/${id}`, {
        course: updatedName.trim(),
      });
      setCourses((prevCourses) =>
        prevCourses.map((course) =>
          course._id === id
            ? { ...course, course: response.data.course }
            : course
        )
      );
    } catch (error) {
      console.error("Error updating course:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete a course
  const deleteCourse = async (id) => {
    setLoading(true);
    try {
      await api.delete(`/api/course/delete/${id}`);
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== id)
      );
    } catch (error) {
      console.error("Error deleting course:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CoursesContext.Provider
      value={{ courses, loading, createCourse, updateCourse, deleteCourse }}
    >
      {children}
    </CoursesContext.Provider>
  );
};
