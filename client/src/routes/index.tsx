import { RouteObject } from "react-router-dom";

import ChatPage from "~/pages/chat/ChatPage";
import LoginPage from "~/pages/auth/LoginPage";
import RegisterPage from "~/pages/auth/RegisterPage";

import AuthLayout from "~/layouts/AuthLayout";
import DashboardLayout from "~/layouts/DashboardLayout";
import ProtectedRoute from "~/routes/ProtectedRoute";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "register",
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/chat",
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            element: <ChatPage />,
            index: true,
          },
        ],
      },
    ],
  },
];

export default routes;
