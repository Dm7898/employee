import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center h-[70vh] lg:h-screen bg-gray-100 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-blue-600 mb-6 text-center">
        Welcome to Employee Platform
      </h1>
      <p className="text-lg sm:text-xl text-gray-700 mb-8 text-center">
        Please register or log in to continue
      </p>

      {/* Links to Register and Login */}
      <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
        <Link
          to="/register"
          className="px-6 py-2 bg-green-500 text-white font-semibold rounded hover:bg-green-600 w-full sm:w-auto text-center"
        >
          Register
        </Link>
        <Link
          to="/login"
          className="px-6 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 w-full sm:w-auto text-center"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Home;
