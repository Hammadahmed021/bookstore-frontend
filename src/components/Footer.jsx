import React from "react";

const Footer = () => {
  const d = new Date();
  let year = d.getFullYear();
  return (
    <footer className="bg-gray-100">
      <div className="max-w-screen-2xl mx-auto px-4 py-6 flex justify-between items-center">
        <div className="w-1/3">Logo</div>
        <div className="w-1/3">left side</div>
        <div className="w-1/3">left side</div>
      </div>
      <div className="max-w-screen-2xl mx-auto px-4 py-2 text-center border-t">
        <span className="text-base text-gray-500">
          {year} Book Store. All Rights Reserved
        </span>
      </div>
    </footer>
  );
};

export default Footer;
