import React, { useState } from "react";
import { useForgotPasswordMutation } from "../store/features/users/usersApi";

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [forgotPassword, { isLoading, error }] = useForgotPasswordMutation();
  
    const handleForgotPassword = async (e) => {
      e.preventDefault();
  
      try {
        const response = await forgotPassword(email).unwrap();
        setMessage(response.message); // The success message from backend
        console.log(response, 'response');
        
      } catch (err) {
        setMessage("Error: " + err.message);
      }
    };
  
    return (
      <div>
        <h2>Forgot Password</h2>
        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
          />
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        {message && <p>{message}</p>}
        {error && <p>Error: {error.message}</p>}
      </div>
    );
  };
  

export default ForgotPassword;
