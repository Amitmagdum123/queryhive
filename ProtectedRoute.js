import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../store/context/UserContext";

const ProtectedRoute = ({ children }) => {
//   const token = localStorage.getItem("authToken");
const { userId } = useUser();

  if (!userId) {
    return <Navigate to="/" />; // Redirect to login if no token
  }

  return children;
};

export default ProtectedRoute;
