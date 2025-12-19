import { createBrowserRouter, Navigate } from "react-router-dom";
import LoginPage from "@/pages/auth/LoginPage";
import UsersListPage from "@/pages/users/UsersListPage";
import UserCreatePage from "@/pages/users/UserCreatePage";
import UserEditPage from "@/pages/users/UserEditPage";
import NotFoundPage from "@/pages/NotFoundPage";
import ProtectedRoute from "@/routes/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/users" replace />,
  },
  {
    path: "/auth/login",
    element: <LoginPage />,
  },
  {
    path: "/users",
    element: (
      <ProtectedRoute>
        <UsersListPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
