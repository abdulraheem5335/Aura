import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import path from "../assets/mencollback.webp";
import { Category } from "../components/Category";
export function MenCollection() {
  const Men = [
    {
      name: "diners-men-accessories",
      path: "",
    },
    {
      name: "men-unstiched-fabric-sale",
      path: "",
    },
    {
      name: "men-sale",
      path: "",
    },
  ];
  const basepath = "/Mencollection/";
  return (
    <>
      <Navbar />
      <Hero
        back={path}
        heading={"Men's Collection"}
        para={
          "Contemporary designs with exceptional comfort for the modern man."
        }
        first={"Shop Now"}
        second={"Collection Features"}
        linkone={"#"}
        linktwo={"#"}
      ></Hero>
      <Category list={Men} basepath={basepath} />
    </>
  );
}
