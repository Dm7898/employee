import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  // If no token, navigate to login
  if (!token) {
    return <Navigate to="/login" />;
  }

  // If the role is 'Customer', navigate to 'No Access'
  if (role === "Customer") {
    return <Navigate to="/no-access" />;
  }
  // Allow access to protected route if token exists and role is not 'customer'
  return children;
};

export default PrivateRoute;
