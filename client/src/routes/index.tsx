import { RouteObject } from "react-router-dom";

import ChatPage from "~/pages/chat/ChatPage";
import LoginPage from "~/pages/auth/LoginPage";
import RegisterPage from "~/pages/auth/RegisterPage";

import AuthLayout from "~/layouts/AuthLayout";
import DashboardLayout from "~/layouts/DashboardLayout";

import PublicRoute from "~/routes/PublicRoute";
import PrivateRoute from "~/routes/PrivateRoute";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <PublicRoute />,
    children: [
      {
        element: <AuthLayout />,
        children: [
          {
            path: "login",
            element: <LoginPage />,
          },
          {
            path: "login",
            element: <RegisterPage />,
          },
        ],
      },
    ],
  },
  {
    path: "/chat",
    element: <PrivateRoute />,
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
