import { useState, useEffect } from "react";
import { AdminLayout } from "../../components/admin/AdminLayout";
import "../../style/admin/products.css";

export function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    product_id: "",
    title: "",
    price_from: 0,
    category: "",
    variants: [],
    images: []
  });
  const [categories, setCategories] = useState([]);
  const [isNewProduct, setIsNewProduct] = useState(false);
  
  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);
  
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/products");
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  
  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/categories");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  
  const handleAddProduct = () => {
    setIsNewProduct(true);
    setFormData({
      product_id: "",
      title: "",
      price_from: 0,
      category: "",
      variants: [{ size: "S", sku: "", price: 0, available: true }],
      images: [""]
    });
    setShowModal(true);
  };
  
  const handleEditProduct = (product) => {
    setIsNewProduct(false);
    setEditingProduct(product);
    setFormData({
      product_id: product.product_id,
      title: product.title,
      price_from: product.price_from,
      category: product.category,
      variants: [...product.variants],
      images: [...product.images]
    });
    setShowModal(true);
  };
  
  const handleDeleteProduct = async (productId) => {
    if (!confirm("Are you sure you want to delete this product?")) return;
    
    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: "DELETE"
      });
      
      if (response.ok) {
        setProducts(products.filter(p => p._id !== productId));
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  const handleVariantChange = (index, field, value) => {
    const updatedVariants = [...formData.variants];
    updatedVariants[index][field] = field === "available" ? value === "true" : value;
    setFormData({ ...formData, variants: updatedVariants });
  };
  
  const addVariant = () => {
    setFormData({
      ...formData,
      variants: [
        ...formData.variants,
        { size: "", sku: "", price: 0, available: true }
      ]
    });
  };
  
  const removeVariant = (index) => {
    const updatedVariants = [...formData.variants];
    updatedVariants.splice(index, 1);
    setFormData({ ...formData, variants: updatedVariants });
  };
  
  const handleImageChange = (index, value) => {
    const updatedImages = [...formData.images];
    updatedImages[index] = value;
    setFormData({ ...formData, images: updatedImages });
  };
  
  const addImage = () => {
    setFormData({
      ...formData,
      images: [...formData.images, ""]
    });
  };
  
  const removeImage = (index) => {
    const updatedImages = [...formData.images];
    updatedImages.splice(index, 1);
    setFormData({ ...formData, images: updatedImages });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const url = isNewProduct
        ? "http://localhost:5000/api/products"
        : `http://localhost:5000/api/products/${editingProduct._id}`;
        
      const method = isNewProduct ? "POST" : "PUT";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const updatedProduct = await response.json();
        
        if (isNewProduct) {
          setProducts([...products, updatedProduct]);
        } else {
          setProducts(products.map(p => p._id === updatedProduct._id ? updatedProduct : p));
        }
        
        setShowModal(false);
        setEditingProduct(null);
      }
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };
  
  return (
    <AdminLayout>
      <div className="admin-products">
        <div className="products-header">
          <h1>Product Management</h1>
          <button className="add-product-btn" onClick={handleAddProduct}>
            Add New Product
          </button>
        </div>
        
        {loading ? (
          <div className="loading">Loading products...</div>
        ) : (
          <div className="products-table-container">
            <table className="products-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product ID</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Base Price</th>
                  <th>Variants</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td>
                      <img width={60}
                        src={product.images[1] || "https://via.placeholder.com/50"} 
                        alt={product.title}
                        className="product-thumbnail"
                      />
                    </td>
                    <td>{product.product_id}</td>
                    <td>{product.title}</td>
                    <td>{product.category}</td>
                    <td>Rs. {product.price_from}</td>
                    <td>{product.variants?.length || 0}</td>
                    <td className="actions">
                      <button 
                        className="edit-btn" 
                        onClick={() => handleEditProduct(product)}
                      >
                        Edit
                      </button>
                      <button 
                        className="delete-btn" 
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        {/* Product Modal Form */}
        {showModal && (
          <div className="modal-overlay">
            <div className="modal product-modal">
              <h2>{isNewProduct ? "Add New Product" : "Edit Product"}</h2>
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Product ID</label>
                  <input
                    type="text"
                    name="product_id"
                    value={formData.product_id}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Title</label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label>Base Price</label>
                  <input
                    type="number"
                    name="price_from"
                    value={formData.price_from}
                    onChange={handleInputChange}
                    required
                    min="0"
                  />
                </div>
                
                <div className="form-group">
                  <label>Category</label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map(category => (
                      <option key={category._id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="form-section">
                  <h3>Variants</h3>
                  {formData.variants.map((variant, index) => (
                    <div key={index} className="variant-group">
                      <div className="variant-row">
                        <div className="form-group">
                          <label>Size</label>
                          <input
                            type="text"
                            value={variant.size}
                            onChange={(e) => handleVariantChange(index, "size", e.target.value)}
                            required
                          />
                        </div>
                        
                        <div className="form-group">
                          <label>SKU</label>
                          <input
                            type="text"
                            value={variant.sku}
                            onChange={(e) => handleVariantChange(index, "sku", e.target.value)}
                          />
                        </div>
                        
                        <div className="form-group">
                          <label>Price</label>
                          <input
                            type="number"
                            value={variant.price}
                            onChange={(e) => handleVariantChange(index, "price", e.target.value)}
                            required
                            min="0"
                          />
                        </div>
                        
                        <div className="form-group">
                          <label>Available</label>
                          <select
                            value={variant.available.toString()}
                            onChange={(e) => handleVariantChange(index, "available", e.target.value)}
                          >
                            <option value="true">Yes</option>
                            <option value="false">No</option>
                          </select>
                        </div>
                      </div>
                      
                      <button 
                        type="button" 
                        className="remove-btn"
                        onClick={() => removeVariant(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button type="button" className="add-btn" onClick={addVariant}>
                    Add Variant
                  </button>
                </div>
                
                <div className="form-section">
                  <h3>Images</h3>
                  {formData.images.map((image, index) => (
                    <div key={index} className="image-group">
                      <div className="form-group">
                        <label>Image URL {index + 1}</label>
                        <input
                          type="text"
                          value={image}
                          onChange={(e) => handleImageChange(index, e.target.value)}
                          required
                        />
                      </div>
                      <button 
                        type="button" 
                        className="remove-btn"
                        onClick={() => removeImage(index)}
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                  <button type="button" className="add-btn" onClick={addImage}>
                    Add Image
                  </button>
                </div>
                
                <div className="form-actions">
                  <button type="submit" className="save-btn">
                    {isNewProduct ? "Create Product" : "Save Changes"}
                  </button>
                  <button 
                    type="button" 
                    className="cancel-btn"
                    onClick={() => setShowModal(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
