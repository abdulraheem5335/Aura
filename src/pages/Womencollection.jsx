import { Navbar } from "../components/Navbar.jsx";
import { Hero } from "../components/Hero.jsx";
import path from "../assets/wocolback.webp";
import { Category } from "../components/Category.jsx";
import wsaleimg from "../assets/wsale.webp";
import imgw from "../assets/salew.webp";
import fragimg from "../assets/frag.webp";
export function WomenCollection() {
  const basepath = "/Womencollection/";
  const Women = [
    {
      name: "women-sale",
      path: "https://diners.com.pk/cdn/shop/files/ready-to-wear_1_9b5658bb-26b8-41b4-a105-4563566c4f27.webp?v=1744794568",
    },
    {
      name: "women-embroidered sale",
      path: "https://diners.com.pk/cdn/shop/files/winter-min_1.png?v=1737631070",
    },
    {
      name: "fragrance-women",
      path: "https://cdn.shopify.com/s/files/1/0752/0442/8072/files/1293c583-bf19-4abb-9f4b-b43e64a07aa7.webp?v=1688375780",
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
