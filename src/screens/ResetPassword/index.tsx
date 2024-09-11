import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { notification } from "antd";

const PasswordResetPage: React.FC = () => {
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const { token } = useParams<{ token: string }>(); // Capture token from URL
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const openNotificationWithIcon = (
    type: "success" | "error",
    message: string,
    description: string,
    duration: number | null = 3
  ) => {
    notification[type]({
      message: message,
      description: description,
      duration: duration !== null ? duration : 0,
    });
  };

  const validatePasswords = (): boolean => {
    if (formData.password !== formData.confirmPassword) {
      openNotificationWithIcon("error", "Error", "Passwords do not match.", 3);
      return false;
    }

    if (formData.password.length < 8) {
      openNotificationWithIcon(
        "error",
        "Error",
        "Password must be at least 8 characters.",
        3
      );
      return false;
    }

    return true;
  };

  const resetPassword = async () => {
    if (!validatePasswords()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ password: formData.password }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        openNotificationWithIcon(
          "error",
          "Reset Failed",
          errorData.message || "Failed to reset password.",
          3
        );
        setLoading(false);
        return;
      }

      openNotificationWithIcon(
        "success",
        "Password Reset",
        "Your password has been successfully reset!",
        3
      );
      navigate("/login");
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Error",
        "Something went wrong. Please try again.",
        3
      );
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          className="absolute bottom-0 w-full h-80 z-0"
        >
          <path
            fill="#ffffff"
            fillOpacity="0.3"
            d="M0,64L1440,160L1440,320L0,320Z"
          />
        </svg>
      </div>

      {/* Password Reset Form */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <motion.div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md">
          <motion.h2 className="text-3xl font-bold text-center mb-6 text-purple-700">
            Reset Your Password
          </motion.h2>

          <input
            className="input-field w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
            type="password"
            name="password"
            placeholder="New Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <input
            className="input-field w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all mt-4"
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            required
          />

          <button
            onClick={resetPassword}
            disabled={loading}
            className="primary-button w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-all mt-4"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default PasswordResetPage;
