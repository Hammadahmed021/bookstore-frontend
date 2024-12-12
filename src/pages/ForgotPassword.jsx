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
    <div className="h-[calc(100vh-120px)] flex items-center justify-center">
      <div className="w-full max-w-sm mx-auto bg-white border shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h2 className="text-xl font-semibold mb-4">Forgot Password</h2>

        <form onSubmit={handleForgotPassword}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="mb-4 shadow-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />


          <button
            type="submit"
            className="bg-primary border rounded-lg w-full text-white px-6 py-2  hover:bg-opacity-80 flex items-center justify-center"

            disabled={isLoading}
          >
            {isLoading ? (
              <div className="loader spinner-border animate-spin border-white border-4 rounded-full w-4 h-4 mr-2"></div>
            ) : null}
            {isLoading ? "Reseting..." : "Reset"}
          </button>
        </form>
        <span className="mt-2 block text-sm text-red-500">
          {/* {message && <p>{message}</p>} */}
          {error && <p>Please enter valid email</p>}
        </span>
      </div>
    </div>
  );
};


export default ForgotPassword;
