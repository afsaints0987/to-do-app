import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Register from "./pages/Register/Register";
import Navigation from "./components/Navigation";

const App: React.FC = () => {
  return (
    <>
      <Navigation/>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Routes>
    </>
  );
};

export default App;
