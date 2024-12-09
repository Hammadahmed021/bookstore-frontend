import React from 'react'
import { useFetchAllOrdersQuery } from '../../store/features/orders/orderApi'
import OrderTable from '../../components/Admin/OrderTable'

const AdminOrders = () => {
  const { data: allOrders} = useFetchAllOrdersQuery()
  const orders = allOrders?.orders
  console.log(orders, 'allOrders');
  
  return (
    <>
      <OrderTable data={orders}/>
    </>
  )
}

export default AdminOrders  