import React from "react";
import { Link, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div>
      Dashboard
      <Link to={"/admin/orders"}>To</Link>
      <Outlet />
    </div>
  );
};

export default Dashboard;
