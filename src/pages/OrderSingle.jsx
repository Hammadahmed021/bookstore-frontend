import React from "react";
import { useParams } from "react-router-dom";
import { useFetchOrderByIdQuery } from "../store/features/orders/orderApi";

const OrderCard = ({ order }) => {
  const { name, email, phone, address, products, totalPrice, createdAt } =
    order;

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="w-full mx-auto bg-white  rounded-lg overflow-hidden border">
      <div className="p-4 sm:flex sm:items-start sm:justify-between border-b">
        <div>
          <h2 className="text-lg font-bold text-gray-800">{name}</h2>
          <p className="text-gray-600">{email}</p>
          <p className="text-gray-600">{phone}</p>
        </div>
        <div className="mt-2 sm:mt-0">
          <span className="text-sm text-gray-500">Order Date:</span>
          <p className="text-gray-800 font-medium">{formatDate(createdAt)}</p>
        </div>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-600">
          Shipping Address:
        </h3>
        <p className="text-gray-800">
          {address?.address}, {address?.city}, {address?.state},{" "}
          {address?.country} - {address?.zipcode}
        </p>
      </div>

      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-600">Products:</h3>
        <ul className="space-y-2">
          {products?.map((product) => (
            <li
              key={product?._id}
              className="flex justify-between items-center text-gray-800 bg-gray-100 p-2 rounded"
            >
              <div>
                <p className="font-medium">{product?.title}</p>
                <p className="text-sm text-gray-600">
                  {product?.quantity} × ${product?.price?.toFixed(2)}
                </p>
              </div>
              <p className="font-bold">
                ${(product?.quantity * product?.price)?.toFixed(2)}
              </p>
            </li>
          ))}
        </ul>
      </div>

      <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
        <span className="text-lg font-bold text-gray-800">Total:</span>
        <span className="text-lg font-bold text-blue-600">
          ${totalPrice?.toFixed(2)}
        </span>
      </div>
    </div>
  );
};

const OrderSingle = () => {
  const { id } = useParams();
  const { data, isLoading, error } = useFetchOrderByIdQuery(id);
  if (isLoading) {
    return <p>Loading order details...</p>;
  }

  if (error) {
    return <p>Something went wrong. Please try again later.</p>;
  }

  if (!data || !data.order) {
    return <p>No order found.</p>;
  }

  return (
    <>
      <OrderCard order={data?.order} />
    </>
  );
};

export default OrderSingle;
