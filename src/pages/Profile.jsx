import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar.jsx";
import "../style/profile.css";

export function Profile() {
  // State to store the user data
  const [user, setUser] = useState(null);

  // Loading and error states for UI feedback
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to fetch user data using ID from localStorage
  const fetchUserData = async () => {
    const userId = localStorage.getItem("userId");
    console.log("userId from localStorage:", userId);
    if (!userId) {
      setError("No user ID found. Please log in first.");
      return;
    }

    try {
      setLoading(true);

      // Fetch all users from API
      const response = await fetch("http://localhost:5000/api/users");
      const users = await response.json();

      // Find the user by matching ID
      const foundUser = users.find((user) => user._id === userId);

      if (!foundUser) {
        throw new Error("User not found in database.");
      }

      // Set the found user
      setUser(foundUser);
      setError(null);
    } catch (err) {
      setError(err.message);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Fetch user data when component mounts
  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <>
      <Navbar />
      
      <div className="profile-container">
        {/* Loading Spinner */}
        {loading && (
          <div className="profile-loading">
            <div className="spinner"></div>
            <p>Loading user information...</p>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="profile-error">
            <p>{error}</p>
          </div>
        )}

        {/* Show user details only if not loading and user is found */}
        {!loading && !error && user && (
          <div className="profile-content">
            <div className="profile-header">
              <h1 className="profile-name">{user.name || "Name not provided"}</h1>
              <span className="profile-role">{user.role || "Role not defined"}</span>
            </div>

            <div className="profile-details">
              <div className="profile-section">
                <h2 className="section-title">Contact Information</h2>
                <div className="profile-info">
                  <div className="info-item">
                    <span className="info-label">Email:</span>
                    <span className="info-value">{user.email || "Not provided"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Phone:</span>
                    <span className="info-value">{user.phone || "Not provided"}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Member Since:</span>
                    <span className="info-value">
                      {user.created_at ? new Date(user.created_at).toLocaleDateString() : "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="profile-section">
                <h2 className="section-title">Address</h2>
                <div className="address-details">
                  <div className="info-item">
                    <span className="info-label">Street:</span>
                    <span className="info-value">
                      {user.addresses && user.addresses[0] ? user.addresses[0].street : "Not provided"}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">City:</span>
                    <span className="info-value">
                      {user.addresses && user.addresses[0] ? user.addresses[0].city : "Not provided"}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">State:</span>
                    <span className="info-value">
                      {user.addresses && user.addresses[0] ? user.addresses[0].state : "Not provided"}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Postal Code:</span>
                    <span className="info-value">
                      {user.addresses && user.addresses[0] ? user.addresses[0].postal_code : "Not provided"}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Country:</span>
                    <span className="info-value">
                      {user.addresses && user.addresses[0] ? user.addresses[0].country : "Not provided"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="profile-actions">
              <button className="edit-button">Edit Profile</button>
            </div>
          </div>
        )}

        {/* Placeholder if user not loaded yet */}
        {!loading && !error && !user && (
          <div className="profile-placeholder">
            <p>User information could not be loaded.</p>
          </div>
        )}
      </div>
    </>
  );
}
