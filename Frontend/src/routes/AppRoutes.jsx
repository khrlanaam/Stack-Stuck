import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Books from "../pages/Books";
import Borrowings from "../pages/Borrowings";

import Admin from "../pages/Admin";

import AdminBorrowings from "../pages/AdminBorrowings";

import ManageBooks from "../pages/admin/ManageBooks";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageBorrowings from "../pages/admin/ManageBorrowings";

import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";

function AppRoutes() {
  return (
    <Routes>

      <Route
        path="/"
        element={<Landing />}
      />

      <Route
        path="/login"
        element={
          <GuestRoute>
            <Login />
          </GuestRoute>
        }
      />

      <Route
        path="/register"
        element={
          <GuestRoute>
            <Register />
          </GuestRoute>
        }
      />

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/books"
        element={
          <ProtectedRoute>
            <Books />
          </ProtectedRoute>
        }
      />

      <Route
        path="/borrowings"
        element={
          <ProtectedRoute>
            <Borrowings />
          </ProtectedRoute>
        }
      />

      {/* ADMIN */}

      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <Admin />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/books"
        element={
          <ProtectedRoute>
            <ManageBooks />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <ProtectedRoute>
            <ManageUsers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/borrowings"
        element={
          <ProtectedRoute>
            <ManageBorrowings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/pending"
        element={
          <ProtectedRoute>
            <AdminBorrowings />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default AppRoutes;