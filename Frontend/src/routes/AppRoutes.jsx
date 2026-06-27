import { Routes, Route } from "react-router-dom";

import Landing from "../pages/Landing";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";

import Books from "../pages/Books";
import Borrowings from "../pages/Borrowings";
import Categories from "../pages/Categories";

import Admin from "../pages/Admin";
import AdminBorrowings from "../pages/AdminBorrowings";

import ManageBooks from "../pages/admin/ManageBooks";
import ManageUsers from "../pages/admin/ManageUsers";
import ManageBorrowings from "../pages/admin/ManageBorrowings";
import ManageCategories from "../pages/admin/ManageCategories";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import AdminRoute from "./AdminRoute";
import BookDetail from "../pages/BookDetail";

function AppRoutes() {
  return (
    <Routes>
      {/* Landing */}
      <Route path="/" element={<Landing />} />

      {/* Auth */}
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

      {/* Home */}
      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      {/* User Pages */}
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

      <Route
        path="/categories"
        element={
          <ProtectedRoute>
            <Categories />
          </ProtectedRoute>
        }
      />
      <Route
        path="/books/:id"
        element={
          <ProtectedRoute>
            <BookDetail />
          </ProtectedRoute>
        }
      />
      {/* ADMIN */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <Admin />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/books"
        element={
          <AdminRoute>
            <ManageBooks />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/users"
        element={
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        }
      />

      <Route
        path="/admin/borrowings"
        element={
          <AdminRoute>
            <ManageBorrowings />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/categories"
        element={
          <AdminRoute>
            <ManageCategories />
          </AdminRoute>
        }
      />
      <Route
        path="/admin/pending"
        element={
          <AdminRoute>
            <AdminBorrowings />
          </AdminRoute>
        }
      />
    </Routes>
  );
}

export default AppRoutes;
