import React, { useEffect } from "react";
import { useFetchAllOrdersQuery } from "../store/features/orders/orderApi";

const Order = () => {
  const { data, isLoading, error } = useFetchAllOrdersQuery();

  console.log(data, 'orders');
  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h2>All Orders</h2>
      <ul>
        {data?.orders?.map((order) => (
          <li key={order._id}>
            <h3>{order.name}</h3>
            <p>Email: {order.email}</p>
            <p>Total: ${order.totalPrice}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Order;
