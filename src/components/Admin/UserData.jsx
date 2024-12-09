import React, { useState, useEffect, useMemo } from "react";
import { useTable, usePagination } from "react-table";
import { FaEdit, FaTrash } from "react-icons/fa";

const UsersTable = ({ data = [], loading, error }) => {
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading users</div>;
  if (!data || data.length === 0) return <div>No users available</div>;

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Created At",
        accessor: "createdAt",
        Cell: ({ value }) => new Date(value).toLocaleDateString(),
      },
      {
        Header: "Actions",
        accessor: "_id",
        Cell: ({ value }) => (
          <div className="flex justify-center">
            <button
              onClick={() => handleEdit(value)}
              className="text-blue-500 mr-2"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => handleDelete(value)}
              className="text-red-500"
            >
              <FaTrash />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // Set up table instance
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
      data,
      initialState: { pageIndex: 0, pageSize: 10 },
    },
    usePagination
  );

  const handleEdit = (id) => {
    // Logic to edit user
    console.log("Edit user with id:", id);
  };

  const handleDelete = (id) => {
    // Logic to delete user
    console.log("Delete user with id:", id);
  };

  return (
    <div className="w-full bg-white shadow-md rounded-lg border">
      <div className="flex items-center justify-between p-4 border-b">
        <h2 className="text-lg font-bold text-gray-700">Users</h2>
        <input
          type="text"
          placeholder="Search by Name or Email"
          className="p-2 border rounded w-auto"
        />
      </div>

      <div className="overflow-x-auto">
        <table {...getTableProps()} className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            {headerGroups.map((headerGroup) => (
              <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    key={column.id}
                    {...column.getHeaderProps()}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    {column.render("Header")}
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
                    <td
                      key={cell.column.id}
                      {...cell.getCellProps()}
                      className="px-6 py-4 whitespace-nowrap text-base text-gray-700"
                    >
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
            className="px-1 py-0 bg-gray-600 text-white rounded"
          >
            {"<<"}
          </button>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="px-1 py-0 bg-gray-600 text-white rounded"
          >
            {"<"}
          </button>
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </span>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="px-1 py-0 bg-gray-600 text-white rounded"
          >
            {">"}
          </button>
          <button
            onClick={() => gotoPage(pageOptions.length - 1)}
            disabled={!canNextPage}
            className="px-1 py-0 bg-gray-600 text-white rounded"
          >
            {">>"}
          </button>
        </div>
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="border border-gray-300 rounded p-1"
        >
          {[5, 10, 20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>
              Show {size}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default UsersTable;
