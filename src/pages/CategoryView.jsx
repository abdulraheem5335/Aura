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
      <div className="productcontainer">
        {product.map((Item, index) => {
          return (
            <div className="productcard" key={index}>
              <img src={Item.images[1] || Item.images[0]} alt="product" />
              <h3>{Item.title}</h3>

              <p>Price: {Item.price_from}</p>
              <button>Add to Cart</button>
            </div>
          );
        })}
      </div>
    </>
  );
}
