import React, { useState, useMemo, useEffect } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const OrderTable = ({ data = [], loading, error }) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (!data || data.length === 0) return <div>No data available</div>;

  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredData = useMemo(
    () =>
      data.filter((item) => {
        const searchString = (item.name || "").toLowerCase();
        return searchString.includes(search.toLowerCase());
      }),
    [data, search]
  );

  const columns = useMemo(
    () => [
      { Header: 'Name', accessor: 'name' },
      { Header: 'Email', accessor: 'email' },
    //   { Header: 'Phone', accessor: 'phone' },
      {
        Header: 'Address',
        accessor: 'address',
        Cell: ({ value }) =>
          `${value?.address || ''}, ${value?.city || ''}, ${value?.state || ''}, ${
            value?.zipcode || ''
          }`,
      },
      { Header: 'Country', accessor: 'address.country' },
      { Header: 'Total Price', accessor: 'totalPrice', Cell: ({ value }) => `$${value.toFixed(2)}` },
    //   {
    //     Header: 'User Type',
    //     accessor: 'userId',
    //     Cell: ({ value }) => (value === null ? 'Guest' : 'Registered'),
    //   },
    //   {
    //     Header: 'Products',
    //     accessor: 'products',
    //     Cell: ({ value }) => value.map((product, index) => <span key={index}>{product.title}, </span>),
    //   },
      { Header: 'Created At', accessor: 'createdAt', Cell: ({ value }) => new Date(value).toLocaleString() },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    state: { pageIndex, pageSize },
    canPreviousPage,
    canNextPage,
    pageOptions,
    gotoPage,
    previousPage,
    nextPage,
    setPageSize,
  } = useTable(
    {
      columns,
      data: filteredData,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    useSortBy,
    usePagination
  );

 

  const handleDelete = (id) => {
    // Show confirmation modal for delete (this can be implemented further)
    console.log(`Deleting item with ID: ${id}`);
  };

  return (
    <div className="w-full bg-white shadow-md rounded-lg border">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-bold text-gray-700">All Orders</h2>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Name or Email"
          className="p-2 border rounded w-auto"
        />
      </div>

      <div className=" overflow-hidden">
        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : "🔽"}
                    </span>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="bg-white divide-y divide-gray-200">
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr key={row.id} {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <td key={cell.column.id} {...cell.getCellProps()} className="px-6 py-4 whitespace-nowrap text-base text-gray-700">
                      {cell.render("Cell")}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between p-4 border-t">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
            className="px-1 py-0 bg-gray-300 text-black rounded"
          >
            {"<<"}
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-1 py-0 bg-gray-300 text-black rounded"
          >
            {"<"}
          </button>
          <span>
            Page <strong>{pageIndex + 1} of {pageOptions.length}</strong>
          </span>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-1 py-0 bg-gray-300 text-black rounded"
          >
            {">"}
          </button>
          <button
            onClick={() => gotoPage(pageOptions.length - 1)}
            disabled={!canNextPage}
            className="px-1 py-0 bg-gray-300 text-black rounded"
          >
            {">>"}
          </button>
        </div>

        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="border border-gray-300 rounded p-1"
        >
          {[5, 10, 20, 30, 40].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default OrderTable;
