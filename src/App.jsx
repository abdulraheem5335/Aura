import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home.jsx";
import { LogIn } from "./pages/Login.jsx";
import { MenCollection } from "./pages/Mencollection.jsx";
import { WomenCollection } from "./pages/Womencollection.jsx";
import { SignUp } from "./pages/Signup.jsx";
import { CategoryView } from "./pages/CategoryView.jsx";
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Login" element={<LogIn />} />
          <Route path="/Mencollection" element={<MenCollection />} />
          <Route path="/Womencollection" element={<WomenCollection />} />
          <Route path="/Signup" element={<SignUp />} />
          <Route path="/Mencollection/:cname" element={<CategoryView />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
