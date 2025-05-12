import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { SignUp } from "./pages/signup.jsx";
import { MenCollection } from "./pages/Mencollection.jsx";
import { WomenCollection } from "./pages/Womencollection.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/Mencollection" element={<MenCollection />} />
          <Route path="/Womencollection" element={<WomenCollection />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
