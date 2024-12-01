import React from "react";
import { useFetchAllBooksQuery } from "../../store/features/books/booksApi";
import { useFetchAllOrdersQuery } from "../../store/features/orders/orderApi";
import { useFetchAllUsersQuery } from "../../store/features/users/usersApi";

const Dashboard = () => {
  const { data: allBooks } = useFetchAllBooksQuery()
  const { data: allOrders } = useFetchAllOrdersQuery()
  const { data: allUsers } = useFetchAllUsersQuery()
  console.log(allUsers, 'allUsers');


  return (
    <div className="flex-1 max-h-full p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card for All Books */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
          <p className="text-xl font-semibold text-gray-800">All Books</p>
          <p className="text-2xl font-bold text-blue-600">{allBooks?.length}</p>
        </div>

        {/* Card for All Orders */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
          <p className="text-xl font-semibold text-gray-800">All Orders</p>
          <p className="text-2xl font-bold text-green-600">{allOrders?.orders?.length}</p>
        </div>

        {/* Card for All Users */}
        <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center justify-center text-center">
          <p className="text-xl font-semibold text-gray-800">All Users</p>
          <p className="text-2xl font-bold text-purple-600">{allUsers?.length}</p>
        </div>
      </div>
    </div>

  );
};

export default Dashboard;
