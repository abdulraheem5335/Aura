import { Navbar } from "../components/Navbar.jsx";
import { Hero } from "../components/Hero.jsx";
import path from "../assets/wocolback.webp";

export function WomenCollection() {
  return (
    <>
      <Navbar />
      <Hero
        back={path}
        heading={"Women's Collection"}
        para={
          "Elegant designs with sustainable luxury for the contemporary woman."
        }
        first={"Shop Now"}
        second={"Collection Features"}
        linkone={"#"}
        linktwo={"#"}
      ></Hero>
    </>
  );
}
