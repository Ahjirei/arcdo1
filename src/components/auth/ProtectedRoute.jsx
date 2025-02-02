import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  
  const isAuthenticated = token && token !== "undefined" && token !== "null";
  
  if (!isAuthenticated) {
    console.log("Not authenticated, redirecting to login");
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;