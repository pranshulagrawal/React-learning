import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { notification } from "antd";

const AccountActivationPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { token } = useParams<{ token: string }>(); // Capture token from URL
  const navigate = useNavigate();

  // Function to open notification
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

  // Function to activate account
  const activateAccount = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:5000/api/auth/activate/${token}`,
        {
          method: "GET",
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        openNotificationWithIcon(
          "error",
          "Activation Failed",
          errorData.message || "Invalid token.",
          3
        );
        setLoading(false);
        return;
      }

      openNotificationWithIcon(
        "success",
        "Account Activated",
        "Your account has been successfully activated!",
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

      {/* Activation Form */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <motion.div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md">
          <motion.h2 className="text-3xl font-bold text-center mb-6 text-purple-700">
            Account Activation
          </motion.h2>
          <p className="text-center mb-4">
            Click the button below to activate your account:
          </p>
          <button
            onClick={activateAccount}
            disabled={loading}
            className="primary-button w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-all"
          >
            {loading ? "Activating..." : "Activate Account"}
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default AccountActivationPage;
