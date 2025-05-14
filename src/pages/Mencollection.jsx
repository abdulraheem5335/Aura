import { Navbar } from "../components/Navbar";
import { Hero } from "../components/Hero";
import path from "../assets/mencollback.webp";
import { Category } from "../components/Category";
import poloimg from "../assets/polo1.webp";
import accimg from "../assets/acc.webp";
import unsimg from "../assets/unstitch.webp";
import saleimg from "../assets/sale.jpeg";
export function MenCollection() {
  const Men = [
    {
      name: "diners-men-polo",
      path: poloimg,
    },
    {
      name: "diners-men-accessories",
      path: accimg,
    },
    {
      name: "men-unstiched-fabric-sale",
      path: unsimg,
    },
    {
      name: "men-sale",
      path: saleimg,
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
