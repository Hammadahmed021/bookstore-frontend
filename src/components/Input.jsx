import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Input = ({
  id,
  type = "text",
  placeholder,
  register,
  validation,
  errors,
  defaultValue = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const isPassword = type === "password";

  return (
    <div className="mb-4 relative">
      <input
        className={`shadow-sm appearance-none border rounded-lg w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
          errors?.[id] ? "border-red-500" : ""
        }`}
        id={id}
        type={isPassword && showPassword ? "text" : type}
        placeholder={placeholder}
        defaultValue={defaultValue} // Use the defaultValue prop
        {...register(id, validation)}
      />
      {isPassword && (
        <button
          type="button"
          className="absolute top-2 right-3 flex items-center text-gray-500 focus:outline-none"
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
        </button>
      )}
      {errors?.[id] && (
        <p className="text-red-500 text-xs mt-1">{errors[id]?.message}</p>
      )}
    </div>
  );
};

export default Input;
