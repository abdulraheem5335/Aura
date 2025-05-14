import { Navbar } from "../components/Navbar.jsx";
import { Hero } from "../components/Hero.jsx";
import path from "../assets/wocolback.webp";
import { Category } from "../components/Category.jsx";
export function WomenCollection() {
  const basepath = "/Womencollection/";
  const Women = [
    {
      name: "women-sale",
      path: "",
    },
    {
      name: "sale-women",
      path: "",
    },
    {
      name: "fragrance-women",
      path: "",
    },
  ];

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
      <Category list={Women} basepath={basepath}></Category>
    </>
  );
}
