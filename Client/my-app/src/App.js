import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmpolyeeForm from "./Component/EmployeeForm";
import Login from "./Component/login.jsx";
import Home from "./Component/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<EmpolyeeForm />} />
        </Routes>

        <Routes>
        <Route path="/" element={<Home />} />
        </Routes>

        <Routes>
        <Route path="/login" element={<Login />} />
        </Routes>

    </BrowserRouter>
  );
}

