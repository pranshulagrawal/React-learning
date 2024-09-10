import React, { useState } from "react";
import { motion } from "framer-motion";

interface UserFormData {
  name?: string;
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
  acceptTerms?: boolean;
}

const AuthPage: React.FC = () => {
  const [view, setView] = useState<"login" | "signup" | "forgotPassword">(
    "login"
  );
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [successMessage, setSuccessMessage] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const validateForm = (): boolean => {
    const errorsArray: string[] = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (view === "signup") {
      // Check for name
      if (formData.name?.trim().length === 0) {
        errorsArray.push("Name is required.");
      }

      // Check for confirm password match
      if (formData.password !== formData.confirmPassword) {
        errorsArray.push("Passwords do not match.");
      }
      if (!emailRegex.test(formData.email)) {
        errorsArray.push("Invalid email format.");
      }

      // Check for terms and conditions
      if (!formData.acceptTerms) {
        errorsArray.push("You must accept the terms and conditions.");
      }
    }

    // Common checks for both login and signup
    if (formData.username.trim().length < 5) {
      errorsArray.push("Username must be at least 5 characters long.");
    }

    if (!passwordRegex.test(formData.password)) {
      errorsArray.push(
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
    }

    // Update errors state
    setErrors(errorsArray);
    return errorsArray.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage(""); // Clear success message
    setErrors([]); // Clear previous errors

    if (!validateForm()) return; // Validate form

    try {
      let response: Response | undefined; // Initialize response as 'Response | undefined'

      if (view === "login") {
        // API call for login
        response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        });
      } else if (view === "signup") {
        // API call for signup
        response = await fetch("http://localhost:5000/api/auth/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            username: formData.username,
            email: formData.email,
            password: formData.password,
            confirmPassword: formData.confirmPassword,
            acceptTerms: formData.acceptTerms,
          }),
        });
      } else if (view === "forgotPassword") {
        // API call for forgot password
        response = await fetch("/api/forgot-password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
          }),
        });
      }

      // Ensure response is defined
      if (response === undefined) {
        setErrors(["No response from the server. Please try again."]);
        return;
      }

      // Handle API response
      if (!response.ok) {
        const errorData = await response.json();
        setErrors([
          errorData.message || "An error occurred. Please try again.",
        ]);
        return;
      }

      const data = await response.json();
      console.log(data);

      // Success messages for each case
      if (view === "login") {
        setSuccessMessage("Successfully logged in!");
        // Reset the form after login
        setFormData({
          name: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          acceptTerms: false,
        });
      } else if (view === "signup") {
        setSuccessMessage("Successfully signed up!");
        // Reset the form after signup
        setFormData({
          name: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          acceptTerms: false,
        });
      } else if (view === "forgotPassword") {
        setSuccessMessage("Password reset link sent to your email.");
        // Reset the form after password reset
        setFormData({
          name: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          acceptTerms: false,
        });
      }
    } catch (error) {
      setErrors(["Something went wrong. Please try again later."]);
    }
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
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
        <motion.div
          className="absolute w-96 h-96 bg-pink-400 opacity-40 rounded-full filter blur-xl top-1/4 left-1/4"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          }}
        ></motion.div>
        <motion.div
          className="absolute w-80 h-80 bg-purple-400 opacity-40 rounded-full filter blur-xl bottom-1/4 right-1/4"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.6, 0.9, 0.6],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: "easeInOut",
          }}
        ></motion.div>
      </div>

      {/* Auth Form and Foreground Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
        <motion.div
          className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md"
          initial="hidden"
          animate="visible"
          variants={formVariants}
        >
          <motion.h2
            className="text-3xl font-bold text-center mb-6 text-purple-700"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1, transition: { duration: 0.6 } }}
          >
            {view === "login"
              ? "Login"
              : view === "signup"
              ? "Signup"
              : "Reset Password"}
          </motion.h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            {view !== "forgotPassword" && (
              <input
                className="input-field w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                required
              />
            )}
            {view !== "forgotPassword" && (
              <input
                className="input-field w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            )}
            {view === "signup" && (
              <>
                <input
                  className="input-field w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <input
                  className="input-field w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <label className="block text-gray-700">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={formData.acceptTerms}
                    onChange={handleInputChange}
                    className="mr-2"
                  />
                  Accept Terms and Conditions
                </label>
              </>
            )}

            {view === "forgotPassword" && (
              <input
                className="input-field w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            )}

            <button
              type="submit"
              className="primary-button w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-all"
              onClick={handleSubmit}
            >
              {view === "login"
                ? "Login"
                : view === "signup"
                ? "Signup"
                : "Send Reset Link"}
            </button>
          </form>

          <p className="text-center mt-4">
            {view === "login" ? (
              <>
                <button
                  className="text-blue-500 underline"
                  onClick={() => setView("forgotPassword")}
                >
                  Forgot Password?
                </button>
                <br />
                Don't have an account?{" "}
                <button
                  className="text-blue-500 underline"
                  onClick={() => setView("signup")}
                >
                  Signup
                </button>
              </>
            ) : view === "signup" ? (
              <button
                className="text-blue-500 underline"
                onClick={() => setView("login")}
              >
                Already have an account? Login
              </button>
            ) : (
              <button
                className="text-blue-500 underline"
                onClick={() => setView("login")}
              >
                Back to Login
              </button>
            )}
          </p>

          {successMessage && (
            <div className="bg-green-100 text-green-700 p-4 rounded-lg mt-4">
              {successMessage}
            </div>
          )}

          {errors.length > 0 && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg mt-4">
              {errors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
