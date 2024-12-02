import React from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 min-h-screen bg-gray-800 text-white flex flex-col">
      <h2 className="text-xl font-bold p-4">Admin Dashboard</h2>
      <nav className="flex-1">
        <NavLink
          to="/admin/dashboard"
          className={({ isActive }) =>
            `block p-4 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
          }
        >   
          Dashboard
        </NavLink>
        <NavLink
          to="/admin/books"
          className={({ isActive }) =>
            `block p-4 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
          }
        >
          Books
        </NavLink>
        <NavLink
          to="/admin/categories"
          className={({ isActive }) =>
            `block p-4 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
          }
        >
          Categories
        </NavLink>
        <NavLink
          to="/admin/orders"
          className={({ isActive }) =>
            `block p-4 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
          }
        >
          Orders
        </NavLink>
        <NavLink
          to="/admin/users"
          className={({ isActive }) =>
            `block p-4 hover:bg-gray-700 ${isActive ? "bg-gray-700" : ""}`
          }
        >
          Users
        </NavLink>
      </nav>
    </div>
  );
};

export default Sidebar;
