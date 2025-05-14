import { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import "../style/productDetails.css";

export function ProductDetails() {
  const { id } = useParams();
  const location = useLocation();
  const [product, setProduct] = useState(location.state?.productData || null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    // If we already have product data from navigation state, use it
    if (location.state?.productData) {
      setProduct(location.state.productData);
      setSelectedImage(location.state.productData.images[1] || location.state.productData.images[0]);
      setLoading(false);
      return;
    }

    // Otherwise fetch from API
    const fetchProduct = async () => {
      try {
        setLoading(true);
        console.log('Fetching product with ID:', id);
        const response = await fetch(`http://localhost:5000/api/products/category/${id}`);
        
        if (!response.ok) {
          throw new Error('Product not found');
        }

        const data = await response.json();
        console.log('Product data:', data);
        setProduct(data);
        setSelectedImage(data.images[1] || data.images[0]);
      } catch (error) {
        console.error("Error:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, location.state]);

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="loading-container">
          <div className="loading">Loading...</div>
        </div>
      </>
    );
  }

  if (error || !product) {
    return (
      <>
        <Navbar />
        <div className="error-container">
          <div className="error">
            {error || 'Unable to load product'}
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="product-details-container">
        <div className="product-gallery">
          <div className="main-image">
            <img src={selectedImage} alt={product.title} />
          </div>
          <div className="thumbnail-gallery">
            {product.images
              .filter(img => img)
              .map((img, index) => (
                <div 
                  key={index} 
                  className={`thumbnail ${selectedImage === img ? 'active' : ''}`}
                  onClick={() => setSelectedImage(img)}
                >
                  <img src={img} alt={`View ${index + 1}`} />
                </div>
              ))}
          </div>
        </div>
        
        <div className="product-info-details">
          <h1>{product.title}</h1>
          <p className="product-code">Product Code: {product.product_id}</p>
          <p className="product-price">Rs. {product.price_from}</p>
          
          <div className="product-specs">
            <div className="spec-item">
              <span className="label">FIT</span>
              <span className="value">Regular Fit</span>
            </div>
            <div className="spec-item">
              <span className="label">GENDER</span>
              <span className="value">{product.category.includes('Men') ? 'MEN' : 'WOMEN'}</span>
            </div>
          </div>

          <div className="size-selection">
            <h3>Select Size</h3>
            <div className="size-options">
              {product.variants.map(variant => (
                <button
                  key={variant._id}
                  className={`size-btn ${selectedSize === variant.size ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(variant.size)}
                  disabled={!variant.available}
                >
                  {variant.size}
                </button>
              ))}
            </div>
          </div>

          <div className="quantity-selection">
            <h3>Quantity</h3>
            <div className="quantity-controls">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
          </div>

          <button 
            className="add-to-cart-btn"
            disabled={!selectedSize}
          >
            Add to Cart
          </button>

          <div className="product-accordion">
            <div className="accordion-item">
              <button 
                className={`accordion-header ${activeSection === 'details' ? 'active' : ''}`}
                onClick={() => toggleSection('details')}
              >
                PRODUCT DETAILS & COMPOSITION
              </button>
              <div className={`accordion-content ${activeSection === 'details' ? 'active' : ''}`}>
                <p>{product.description || "This product features premium quality material and craftsmanship."}</p>
              </div>
            </div>

            <div className="accordion-item">
              <button 
                className={`accordion-header ${activeSection === 'delivery' ? 'active' : ''}`}
                onClick={() => toggleSection('delivery')}
              >
                DELIVERIES & RETURNS
              </button>
              <div className={`accordion-content ${activeSection === 'delivery' ? 'active' : ''}`}>
                <p>Free delivery on orders above Rs. 2,500<br/>
                   Standard delivery time: 3-5 working days<br/>
                   Easy returns within 14 days</p>
              </div>
            </div>

            <div className="accordion-item">
              <button 
                className={`accordion-header ${activeSection === 'special' ? 'active' : ''}`}
                onClick={() => toggleSection('special')}
              >
                SPECIAL RETURN CONDITIONS
              </button>
              <div className={`accordion-content ${activeSection === 'special' ? 'active' : ''}`}>
                <p>Items must be unused and in original packaging<br/>
                   Tags must be attached<br/>
                   All accessories must be included</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
//everything is working fine