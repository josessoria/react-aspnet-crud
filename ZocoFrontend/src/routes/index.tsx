import React from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import { AuthProvider } from "../context/AuthContext";
import ProtectedUnLoggedRoute from "./middlewares/ProtectedUnLogedUser";
import ProtectedRoute from "./middlewares/ProtectedRoute";
import Home from "../pages/Home";
import Navbartab from "../components/Navbar/Navbar";


const Router = () => {
  return (
    <AuthProvider>
      <Navbartab />
      <Routes>
        <Route
          path="/login"
          element={
            <ProtectedUnLoggedRoute>
              <Login />
            </ProtectedUnLoggedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedUnLoggedRoute>
              <Register />
            </ProtectedUnLoggedRoute>
          }
        />
        <Route path="/" element={<Home />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Register />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default Router;
