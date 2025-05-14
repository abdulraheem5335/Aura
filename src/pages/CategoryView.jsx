import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import "../style/categoryview.css";

export function CategoryView() {
  const { cname } = useParams();
  const [product, setproduct] = useState([]);

  async function getdata() {
    try {
      const result = await fetch(
        `http://localhost:5000/api/products/category/${cname}`
      );
      const data = await result.json();
      setproduct(data.slice(0, 20));
      console.log(data[1]);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getdata();
  }, []);

  return (
    <>
      <Navbar />
      <div className="category-container">
        <h2 className="category-title">{cname}</h2>
        <div className="product-grid">
          {product.map((Item, index) => (
            <div className="product-card" key={index}>
              <div className="product-image">
                <img src={Item.images[1] || Item.images[0]} alt={Item.title} />
              </div>
              <div className="product-info">
                <h3>{Item.title}</h3>
                <p className="price">Rs. {Item.price_from}</p>
                <button className="add-to-cart">Add to Cart</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
