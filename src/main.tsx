import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import AuthProvider from "./contexts/AuthContext.tsx";
import LayoutPage from "./pages/LayoutPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import CallbackPage from "./pages/CallbackPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import TeamManagePage from "./pages/TeamManagePage.tsx";
import ApplicationPage from "./pages/ApplicationPage.tsx";
import { NextUIProvider } from "@nextui-org/react";
import { loader as ApplicationLoader } from "./utils/loader.ts";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/callback",
    element: <CallbackPage />,
  },
  {
    path: "/",
    element: <LayoutPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/app/:appId",
        loader: ApplicationLoader,
        element: <ApplicationPage />,
      },
      {
        path: "/team",
        element: <TeamManagePage />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <NextUIProvider>
        <RouterProvider router={router} />
      </NextUIProvider>
    </AuthProvider>
  </React.StrictMode>
);
