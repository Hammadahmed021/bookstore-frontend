import React, { useEffect } from "react";
import {
  useFetchAllOrdersQuery,
  useFetchOrdersByUserIdQuery,
} from "../store/features/orders/orderApi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useVerifyUserQuery } from "../store/features/users/usersApi";

const Order = () => {
  const checkUser = useSelector((state) => state.auth.user);

  const { data: verifyUser } = useVerifyUserQuery();
  const userId = verifyUser?.user?.id;

  console.log(userId, 'userId');
  
  const { data, error, isLoading } = useFetchOrdersByUserIdQuery(userId);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }


  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        {checkUser?.name} Orders
      </h1>
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.orders?.map((order) => (
          <li
            key={order?._id}
            className="bg-white border rounded-lg p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-700">
                {order?.name}
              </h3>
              <span className="text-sm text-gray-500">
                Total:{" "}
                <span className="font-bold text-blue-600">
                  ${order?.totalPrice?.toFixed(2)}
                </span>
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              <span className="font-medium">Email:</span> {order?.email}
            </p>
            <Link
              to={`/order/${order?._id}`}
              className="block text-center mt-4 bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 transition-colors"
            >
              View Order
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Order;
