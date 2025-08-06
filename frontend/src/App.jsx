import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import SignUp from "./components/authentication/SignUp";
import Login from "./components/authentication/Login";

function App() {
  return (
    <>
      <div className="App">
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
