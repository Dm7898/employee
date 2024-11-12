import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header Section */}
      <header className="flex flex-col md:flex-row items-center justify-between px-4 md:px-6 py-4 bg-blue-600 text-white mb-2">
        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4">
          <Link
            to="/"
            className="hover:underline text-sm sm:text-base md:text-lg"
          >
            Home
          </Link>
          <Link
            to="/employee-list"
            className="hover:underline text-sm sm:text-base md:text-lg"
          >
            Employee List
          </Link>
          <Link
            to="/course-table"
            className="hover:underline text-sm sm:text-base md:text-lg"
          >
            Course Master
          </Link>
        </div>

        <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mt-2 md:mt-0">
          <span className="font-semibold text-sm sm:text-base md:text-lg">
            {username.charAt(0).toUpperCase() + username.slice(1).toLowerCase()}
          </span>
          <button
            onClick={handleLogout}
            className="px-3 py-1 text-xs sm:text-sm md:text-base bg-red-500 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Main Content Section */}
      <main className="px-4 md:px-6 py-4">{children}</main>
    </div>
  );
};

export default Layout;
