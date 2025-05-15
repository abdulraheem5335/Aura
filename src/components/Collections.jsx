import "../style/collections.css";
import menimage from "../assets/men.webp";
import womenimage from "../assets/women.webp";
import accessories from "../assets/accessories.jpg";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

export function Collections() {
  const [slider, setslider] = useState(0);

  const collections = [
    {
      id: 1,
      title: "Men's Collection",
      image: menimage,
      link: "/Mencollection",
    },
    {
      id: 2,
      title: "Women's Collection",
      image: womenimage,
      link: "/Womencollection",
    },
    {
      id: 3,
      title: "Accessories Collection",
      image: accessories,
      link: "/Accessories",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setslider((current) =>
        current === collections.length - 1 ? 0 : current + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleNavigation = (direction) => {
    setslider((current) => {
      if (direction === "prev") {
        return current === 0 ? collections.length - 1 : current - 1;
      } else {
        return current === collections.length - 1 ? 0 : current + 1;
      }
    });
  };

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
        <div className="slider-navigation">
          <button
            className="nav-btn prev"
            onClick={() => handleNavigation("prev")}
            aria-label="Previous slide"
          >
            <AiOutlineLeft size={24} />
          </button>
          <button
            className="nav-btn next"
            onClick={() => handleNavigation("next")}
            aria-label="Next slide"
          >
            <AiOutlineRight size={24} />
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
            <h2 className="collection-heading">{collection.title}</h2>
            <div className="collection-button">
              <Link to={collection.link} className="viewlink">
                View Collection
              </Link>
            </div>
          </div>
        ))}

        <div className="slider-dots">
          {collections.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === slider ? "active" : ""}`}
              onClick={() => setslider(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
