import React, { useState } from "react";

// TypeScript interfaces for form data
interface UserFormData {
  name?: string;
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
  acceptTerms?: boolean;
}

const AuthPage: React.FC = () => {
  // State to manage the current form view: 'login', 'signup', or 'forgotPassword'
  const [view, setView] = useState<"login" | "signup" | "forgotPassword">(
    "login"
  );

  // State management for form inputs
  const [formData, setFormData] = useState<UserFormData>({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  // State management for validation messages
  const [errors, setErrors] = useState<string[]>([]);

  // State management for success messages
  const [successMessage, setSuccessMessage] = useState<string>("");

  // Handle input change
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validation function
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

  // Handle form submission
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
        // Additional logic for logged-in state
      } else if (view === "signup") {
        setSuccessMessage("Successfully signed up!");
        // Additional logic for signed-up state
      } else if (view === "forgotPassword") {
        setSuccessMessage("Password reset link sent to your email.");
        // Additional logic after sending reset link
      }
    } catch (error) {
      setErrors(["Something went wrong. Please try again later."]);
    }
  };

  return (
    <div>
      {view === "login" && (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Login</button>
          </form>

          {/* Forgot Password Link */}
          <p>
            <button onClick={() => setView("forgotPassword")}>
              Forgot Password?
            </button>
          </p>

          {/* Switch to Signup */}
          <p>
            Don't have an account?{" "}
            <button onClick={() => setView("signup")}>Signup</button>
          </p>
        </div>
      )}

      {view === "signup" && (
        <div>
          <h2>Signup</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            <label>
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleInputChange}
              />
              Accept Terms and Conditions
            </label>
            <button type="submit">Signup</button>
          </form>

          {/* Switch to Login */}
          <p>
            Already have an account?{" "}
            <button onClick={() => setView("login")}>Login</button>
          </p>
        </div>
      )}

      {view === "forgotPassword" && (
        <div>
          <h2>Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            <button type="submit">Send Reset Link</button>
          </form>

          {/* Back to Login */}
          <p>
            <button onClick={() => setView("login")}>Back to Login</button>
          </p>
        </div>
      )}

      {/* Error Messages */}
      {errors.length > 0 && (
        <div>
          {errors.map((error, index) => (
            <p key={index} style={{ color: "red" }}>
              {error}
            </p>
          ))}
        </div>
      )}

      {/* Success Message */}
      {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
    </div>
  );
};

export default AuthPage;
