import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { SuccessPopup } from "../components/SuccessPopup";
import "../style/editProfile.css";

export function EditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    phone: "",
    street: "",
    city: "",
    state: "",
    postal_code: "",
    country: "Pakistan",
  });
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = localStorage.getItem("userId");
      try {
        const response = await fetch("http://localhost:5000/api/users");
        const users = await response.json();
        const user = users.find((u) => u._id === userId);
        
        if (user) {
          setFormData({
            phone: user.phone || "",
            street: user.addresses[0]?.street || "",
            city: user.addresses[0]?.city || "",
            state: user.addresses[0]?.state || "",
            postal_code: user.addresses[0]?.postal_code || "",
            country: user.addresses[0]?.country || "Pakistan",
          });
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem("userId");

    try {
      const updateData = {
        phone: formData.phone,
        addresses: [{
          street: formData.street,
          city: formData.city,
          state: formData.state,
          postal_code: formData.postal_code,
          country: formData.country,
          is_default: true
        }]
      };

      const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(updateData)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const data = await response.json();
      console.log('Update successful:', data);
      setShowPopup(true);

    } catch (error) {
      console.error('Update error:', error);
      alert(error.message || 'Failed to update profile');
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
    navigate('/profile');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="edit-profile-container">
        <div className="edit-profile-card">
          <h2>Edit Profile</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
              />
            </div>

            <div className="form-group">
              <label>Street Address</label>
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Enter street address"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  required
                />
              </div>

              <div className="form-group">
                <label>State</label>
                <input
                  type="text"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  placeholder="Enter state"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Postal Code</label>
                <input
                  type="text"
                  name="postal_code"
                  value={formData.postal_code}
                  onChange={handleChange}
                  placeholder="Enter postal code"
                  required
                />
              </div>

              <div className="form-group">
                <label>Country</label>
                <input
                  type="text"
                  name="country"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Enter country"
                  required
                />
              </div>
            </div>

            <div className="button-group">
              <button type="submit" className="save-btn">Save Changes</button>
              <button 
                type="button" 
                className="cancel-btn"
                onClick={() => navigate('/profile')}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>

      <SuccessPopup
        isOpen={showPopup}
        onClose={handlePopupClose}
        message="Profile updated successfully!"
      />
    </>
  );
}
