import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Categories from "../pages/Categories";

import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

function AppRoutes() {
  return (
    <Routes>
      {/* Landing */}
      <Route path="/" element={<Landing />} />

      {/* Login */}
      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />

      {/* Register */}
      <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />

      {/* Home */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* Categories */}
      <Route
        path="/categories"
        element={
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;