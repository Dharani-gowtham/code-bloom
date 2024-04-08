import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";

import Home from "./pages/Home.jsx";
import EditorPage from "./pages/EditorPage.jsx";
import Test from "./pages/Test.jsx";
import Analytics from "./pages/Analytics.jsx";
import Profile from "./pages/Profile.jsx";
import Course from "./pages/Course.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/editor",
    element: <EditorPage />,
  },
  {
    path: "/test",
    element: <Test />,
  },
  {
    path: "/analytics",
    element: <Analytics />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/course",
    element: <Course />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
