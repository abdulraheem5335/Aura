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
      path: "https://cdn.shopify.com/s/files/1/0752/0442/8072/files/T-SHIRT-255X255.png?v=1692187597",
    },
    {
      name: "diners-men-accessories",
      path: "https://cdn.shopify.com/s/files/1/0752/0442/8072/files/accessories_9804a223-5cc7-441f-b48c-6cc6fdae8f1c.webp?v=1693997526",
    },
    {
      name: "men-unstiched-fabric-sale",
      path: "https://cdn.shopify.com/s/files/1/0752/0442/8072/files/Shawl_1f3bc8e9-d4c5-4361-b2b7-528fe82ded31.png?v=1698645733",
    },
    {
      name: "men-sale",
      path: "https://diners.com.pk/cdn/shop/files/Shirt-.Collection.jpg?v=1716287522",
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
