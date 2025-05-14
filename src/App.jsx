import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Footer } from "./components/Footer.jsx";
import { CategoryView } from "./pages/CategoryView.jsx";
import { Home } from "./pages/Home.jsx";
import { LogIn } from "./pages/Login.jsx";
import { MenCollection } from "./pages/Mencollection.jsx";
import { ProductDetails } from "./pages/ProductDetails.jsx";
import { Profile } from "./pages/Profile.jsx";
import { SignUp } from "./pages/Signup.jsx";
import { WomenCollection } from "./pages/Womencollection.jsx";

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
          <Route path="/Womencollection/:cname" element={<CategoryView />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
