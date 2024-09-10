import React, { useState } from "react";
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, Stars } from "@react-three/drei";

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccessMessage("");
    setErrors([]);
    // Your form submission logic
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Full-Height 3D Canvas Background */}
      <Canvas className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <ambientLight intensity={0.5} />
        <Stars />
        <OrbitControls enableZoom={false} />
        <Sphere args={[1.5, 100, 200]} position={[0, 0, -5]}>
          <meshStandardMaterial color="#6f42c1" wireframe />
        </Sphere>
      </Canvas>

      {/* Auth Form and Foreground Content */}
      <div className="absolute z-10 flex flex-col items-center justify-center w-full h-full">
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
                className="input-field w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
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
                className="input-field w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
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
                  className="input-field w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
                <input
                  className="input-field w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
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
                className="input-field w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
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
