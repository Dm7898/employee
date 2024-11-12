import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./PrivateRoute";
import Register from "./pages/Register";
import NoAcess from "./pages/NoAcess";
import Home from "./pages/Home";
import EmployeeList from "./pages/EmployeeList";
import EmployeeForm from "./pages/EmployeeForm";
import EditEmployee from "./pages/EditEmployee";
import CourseTable from "./pages/CourseTable";
import { CoursesProvider } from "./CoursesContext";

function App() {
  return (
    <CoursesProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/no-access" element={<NoAcess />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/employee-list"
            element={
              <PrivateRoute>
                <EmployeeList />
              </PrivateRoute>
            }
          />
          <Route
            path="/create-employee"
            element={
              <PrivateRoute>
                <EmployeeForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/edit-employee/:id"
            element={
              <PrivateRoute>
                <EditEmployee />
              </PrivateRoute>
            }
          />
          <Route
            path="/course-table"
            element={
              <PrivateRoute>
                <CourseTable />
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </CoursesProvider>
  );
}

export default App;
