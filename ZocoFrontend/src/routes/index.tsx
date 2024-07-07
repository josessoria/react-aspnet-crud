import { Route, Routes } from "react-router-dom";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import ProtectedUnLoggedRoute from "./middlewares/ProtectedUnLogedUser";
import ProtectedRoute from "./middlewares/ProtectedRoute";
import Home from "../pages/Home";
import NavbarMiddleware from "./middlewares/NavbarMiddleware";
import UserMiddleware from "./middlewares/UserMiddleware";

const Router = () => {
  return (
    <Routes>
      <Route element={<NavbarMiddleware />}>
        <Route element={<UserMiddleware />}>
          <Route path="/" element={<Home />} />
          

          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" />
          </Route>
        </Route>
      </Route>
      <Route element={<ProtectedUnLoggedRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default Router;
