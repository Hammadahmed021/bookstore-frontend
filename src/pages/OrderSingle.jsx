import React from "react";
import { useParams } from "react-router-dom";
import { useFetchOrderByIdQuery } from "../store/features/orders/orderApi";
import { OrderCard } from "../components";

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
