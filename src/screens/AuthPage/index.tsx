import React, { useState } from "react";
import { motion } from "framer-motion";
import { UserFormData } from "../../model/userFormData";
import { useNavigate } from "react-router-dom";
import { notification, Tabs, Select } from "antd";

const { Option } = Select;

const AuthPage: React.FC = () => {
  // State for tracking the current form view (login/signup)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [view, setView] = useState<"login" | "signup">("login");

  // State for showing the forgot password form
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // State for handling form data
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    username: "",
    email: "",
    gender: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  // Ant Design notification function for success and error messages
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

  // Function to close all notifications when user interacts with the form
  const closeAllNotifications = () => {
    notification.destroy();
  };

  // Input change handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
    closeAllNotifications(); // Close notifications on any input change
  };

  const handleGenderChange = (value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      gender: value,
    }));
  };

  // Login form validation
  const validateLoginForm = (): boolean => {
    const errorsArray: string[] = [];
    if (formData.username.trim().length < 5) {
      errorsArray.push("Username must be at least 5 characters long.");
    }
    if (formData.password.trim().length === 0) {
      errorsArray.push("Password is required.");
    }
    setErrors(errorsArray);
    return errorsArray.length === 0;
  };

  // Signup form validation
  const validateSignupForm = (): boolean => {
    const errorsArray: string[] = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

    if (formData.name?.trim().length === 0) {
      errorsArray.push("Name is required.");
    }
    if (formData.username?.trim().length === 0) {
      errorsArray.push("Username is required.");
    }
    if (formData.username?.trim().length < 5) {
      errorsArray.push("Username must be at least 5 characters long.");
    }

    if (formData.password !== formData.confirmPassword) {
      errorsArray.push("Passwords do not match.");
    }

    if (!emailRegex.test(formData.email)) {
      errorsArray.push("Invalid email format.");
    }

    if (!formData.acceptTerms) {
      errorsArray.push("You must accept the terms and conditions.");
    }

    if (!passwordRegex.test(formData.password)) {
      errorsArray.push(
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
    }

    if (!formData.gender || formData.gender.trim() === "") {
      errorsArray.push("Gender is required.");
    }
    setErrors(errorsArray);
    return errorsArray.length === 0;
  };

  // Forgot password form validation
  const validateForgotPasswordForm = (): boolean => {
    const errorsArray: string[] = [];
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      errorsArray.push("Invalid email format.");
    }
    setErrors(errorsArray);
    return errorsArray.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent, formType: string) => {
    e.preventDefault();
    closeAllNotifications(); // Close notifications when user clicks submit

    setErrors([]);

    let isValid = false;
    if (formType === "login") {
      isValid = validateLoginForm();
    } else if (formType === "signup") {
      isValid = validateSignupForm();
    } else if (formType === "forgotPassword") {
      isValid = validateForgotPasswordForm();
    }

    if (!isValid) {
      // Show error notifications for validation errors
      errors.forEach((error) =>
        openNotificationWithIcon("error", "Validation Error", error, 3)
      );
      return;
    }

    // Handle form submission logic here (login/signup/forgotPassword)
    try {
      let response: Response | undefined;

      if (formType === "login") {
        response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            username: formData.username,
            password: formData.password,
          }),
        });
      } else if (formType === "signup") {
        response = await fetch(
          `${process.env.REACT_APP_API_URL}/auth/register`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              name: formData.name,
              username: formData.username,
              email: formData.email,
              password: formData.password,
              acceptTerms: formData.acceptTerms,
              role: "user",
              profile: {
                gender: formData.gender,
              },
            }),
          }
        );
      } else if (formType === "forgotPassword") {
        response = await fetch(
          `${process.env.REACT_APP_API_URL}/auth/forgot-password`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: formData.email,
            }),
          }
        );
      }

      if (response === undefined) {
        openNotificationWithIcon(
          "error",
          "Error",
          "No response from the server. Please try again.",
          3
        );
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        openNotificationWithIcon(
          "error",
          "Error",
          errorData.message || "An error occurred. Please try again.",
          3
        );
        return;
      }

      if (formType === "login") {
        openNotificationWithIcon(
          "success",
          "Login Successful",
          "Successfully logged in!",
          3
        );
        setFormData({
          name: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          acceptTerms: false,
        });
        navigate("/admin/dashboard");
      } else if (formType === "signup") {
        openNotificationWithIcon(
          "success",
          "Signup Successful",
          "Successfully signed up! Check your email to activate your account.",
          3
        );
        setFormData({
          name: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          acceptTerms: false,
        });
      } else if (formType === "forgotPassword") {
        openNotificationWithIcon(
          "success",
          "Password Reset",
          "Password reset link sent to your email.",
          3
        );
        setFormData({
          name: "",
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          acceptTerms: false,
        });
        setShowForgotPassword(false); // Hide forgot password and go back to login
      }
    } catch (error) {
      openNotificationWithIcon(
        "error",
        "Error",
        "Something went wrong. Please try again later.",
        3
      );
    }
  };

  // Form animation variants
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
          {!showForgotPassword ? (
            <>
              {/* Tabs for Login, Signup */}
              <Tabs
                defaultActiveKey="login"
                centered
                onChange={(key) => setView(key as "login" | "signup")}
              >
                <Tabs.TabPane tab="Sign In" key="login">
                  <motion.h2
                    className="text-3xl font-bold text-center mb-6 text-purple-700"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1, transition: { duration: 0.6 } }}
                  >
                    Sign In
                  </motion.h2>

                  <form
                    onSubmit={(e) => handleSubmit(e, "login")}
                    className="space-y-4"
                  >
                    <input
                      className="input-field w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={formData.username}
                      onChange={handleInputChange}
                    />

                    <input
                      className="input-field w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />

                    <button
                      type="submit"
                      className="primary-button w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-all"
                    >
                      Login
                    </button>
                  </form>

                  <p className="text-center mt-4">
                    <button
                      className="text-blue-500 underline"
                      onClick={() => setShowForgotPassword(true)}
                    >
                      Forgot Password?
                    </button>
                  </p>
                </Tabs.TabPane>

                <Tabs.TabPane tab="Create Account" key="signup">
                  <motion.h2
                    className="text-3xl font-bold text-center mb-6 text-purple-700"
                    initial={{ scale: 0.8 }}
                    animate={{ scale: 1, transition: { duration: 0.6 } }}
                  >
                    Create New Account
                  </motion.h2>

                  <form
                    onSubmit={(e) => handleSubmit(e, "signup")}
                    className="space-y-4"
                  >
                    <input
                      className="input-field w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
                      type="text"
                      name="name"
                      placeholder="Name"
                      value={formData.name}
                      onChange={handleInputChange}
                    />

                    <input
                      className="input-field w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
                      type="text"
                      name="username"
                      placeholder="Username"
                      value={formData.username}
                      onChange={handleInputChange}
                    />

                    <input
                      className="input-field w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    <Select
                      showSearch
                      placeholder="Select Gender"
                      onChange={handleGenderChange}
                      size="large"
                      allowClear
                      className="w-full focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
                    >
                      <Option value="male">Male</Option>
                      <Option value="female">Female</Option>
                      <Option value="other">Other</Option>
                    </Select>

                    <input
                      className="input-field w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />

                    <input
                      className="input-field w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
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

                    <button
                      type="submit"
                      className="primary-button w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-all"
                    >
                      Signup
                    </button>
                  </form>
                </Tabs.TabPane>
              </Tabs>
            </>
          ) : (
            <>
              <motion.h2
                className="text-3xl font-bold text-center mb-6 text-purple-700"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1, transition: { duration: 0.6 } }}
              >
                Forgot Password
              </motion.h2>

              <form
                onSubmit={(e) => handleSubmit(e, "forgotPassword")}
                className="space-y-4"
              >
                <input
                  className="input-field w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 transition-all"
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                />

                <button
                  type="submit"
                  className="primary-button w-full bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-all"
                >
                  Send Reset Link
                </button>
              </form>

              <p className="text-center mt-4">
                <button
                  className="text-blue-500 underline"
                  onClick={() => setShowForgotPassword(false)}
                >
                  Back to Sign In
                </button>
              </p>
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
