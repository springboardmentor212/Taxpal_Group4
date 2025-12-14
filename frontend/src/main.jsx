import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import Settings from "./pages/Settings";        // <-- add this
import EditProfile from "./pages/EditProfile";  // <-- add this

import "./styles.css";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Login />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
        <Route path="settings" element={<Settings />} />          {/* <-- add this */}
        <Route path="edit-profile" element={<EditProfile />} />   {/* <-- add this */}
      </Route>
    </Routes>
  </BrowserRouter>
);