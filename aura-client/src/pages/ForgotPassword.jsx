import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { useToast } from "../context/ToastContext";
import "../style/forgotPassword.css";

export function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const toast = useToast();

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    try {
      console.log("Requesting OTP for:", email);

      const response = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.toLowerCase(),
          action: "requestOTP",
        }),
      });

      const data = await response.json();
      console.log("Server response:", data);

      if (response.ok) {
        toast.success("OTP sent successfully!");
        setStep(2);
      } else {
        toast.error(data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Request error:", error);
      toast.error("Connection error. Please try again.");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/users/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp, newPassword }),
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Password reset successful!");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        toast.error(data.message || "Invalid OTP");
      }
    } catch (error) {
      toast.error("Failed to reset password");
    }
  };

  return (
    <>
      <Navbar />
      <div className="forgot-container">
        <div className="forgot-card">
          <h2>Reset Your Password</h2>
          {step === 1 ? (
            <form onSubmit={handleRequestOTP}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit">Send OTP</button>
            </form>
          ) : (
            <form onSubmit={handleResetPassword}>
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <button type="submit">Reset Password</button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
