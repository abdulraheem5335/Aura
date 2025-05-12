import "../style/collections.css";
import menimage from "../assets/men.webp";
import womenimage from "../assets/women.webp";
import { Link } from "react-router-dom";
import { useState } from "react";

export function Collections() {
  const [slider, setslider] = useState(0);

  function handleprev() {
    setslider(() => (slider === 0 ? collections.length - 1 : slider - 1));
  }
  function handlenext() {
    setslider(() => (slider === collections.length - 1 ? 0 : slider + 1));
  }

  let collections = [
    {
      id: 1,
      title: "Men's Collection",
      image: menimage,
      link: "#",
    },
    {
      id: 2,
      title: "Women's Collection",
      image: womenimage,
      link: "#",
    },
  ];

  return (
    <section id="collection" className="collections">
      <div className="collections-content">
        <h1 className="collections-title">Featured Collections</h1>
        <p className="collections-description">
          AURA represents the pinnacle of contemporary fashion, where innovative
          design meets exceptional craftsmanship. Our collections are
          meticulously created to push the boundaries of style while maintaining
          uncompromising comfort and quality. With each piece, we strive to
          create more than just clothing .we create experiences and expressions
          that resonate with your unique personality. Discover our latest
          collections that blend cutting-edge design with sustainable practices,
          offering you fashion that looks good and feels good in every sense.
        </p>
      </div>
      <div className="container">
        <div className="prevdiv">
          <button className="prev" onClick={handleprev}>
            prev
          </button>
        </div>
        <div className="nextdiv">
          <button className="next" onClick={handlenext}>
            next
          </button>
        </div>

        {collections.map((collection, index) => (
          <div
            className={`collection-container ${
              index === slider ? "active" : ""
            }`}
            key={collection.id}
            style={{ transform: `translateX(${(index - slider) * 100}%)` }}
          >
            <img
              src={collection.image}
              alt={collection.title}
              className="collection-image"
            />
            <h2 className="collection-heading">{collection.title} </h2>
            <div className="collection-button">
              <Link
                to={
                  slider === 0
                    ? "/Mencollection"
                    : slider === 1
                    ? "/Womencollection"
                    : "/Accessories"
                }
                className="viewlink"
              >
                View Collection{" "}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
