import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import "../style/categoryview.css";

export function CategoryView() {
  const { cname } = useParams();
  const navigate = useNavigate();
  const [product, setproduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getdata() {
    try {
      setLoading(true);
      const result = await fetch(
        `http://localhost:5000/api/products/category/${cname}`
      );
      
      if (!result.ok) {
        throw new Error("Failed to fetch products");
      }
      
      const data = await result.json();
      setproduct(data.slice(0, 52));
      console.log("Fetched products:", data.length);
    } catch (err) {
      console.error("Error fetching products:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getdata();
  }, [cname]);

  const handleProductClick = (Item) => {
    navigate(`/product/${Item._id}`, { state: { productData: Item } });
  };
  
  // Helper function to get a valid product image
  const getProductImage = (product) => {
    if (product.images && product.images.length > 0) {
      return product.images[0];
    }
    return "https://via.placeholder.com/300x450?text=No+Image";
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-container">
          <div className="loading">Loading products...</div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="error-container">
          <div className="error">{error}</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="category-container">
        <h2 className="category-title">{cname}</h2>
        <div className="product-grid">
          {product.length === 0 ? (
            <div className="no-products">No products found in this category.</div>
          ) : (
            product.map((Item, index) => (
              <div className="product-card" key={index}>
                <div className="product-image">
                  <img src={getProductImage(Item)} alt={Item.title || "Product"} />
                </div>
                <div className="product-info">
                  <h3>{Item.title || `Product ${Item.product_id}`}</h3>
                  <p className="price">Rs. {Item.price_from}</p>
                  <button
                    className="add-to-cart"
                    onClick={() => handleProductClick(Item)}
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
