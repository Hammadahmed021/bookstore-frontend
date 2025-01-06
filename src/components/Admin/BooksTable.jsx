import React, { useState, useMemo } from "react";
import {
  useTable,
  useSortBy,
  usePagination,
  useGlobalFilter,
} from "react-table";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDeleteBookMutation } from "../../store/features/books/booksApi";

const BooksTable = ({ data = [], loading, error }) => {
  const [search, setSearch] = useState("");
  const [deleteBookId, setDeleteBookId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // RTK Mutation Hook
  const [deleteBook] = useDeleteBookMutation();

  const navigate = useNavigate();

  const filteredData = useMemo(
    () =>
      data.filter((books) => {
        const booknames = books?.title || "";
        return booknames.toLowerCase().includes(search.toLowerCase());
      }),
    [data, search]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Category",
        accessor: "category",
      },
      {
        Header: "Price",
        accessor: "newPrice",
        Cell: ({ value }) => `$${value}`,
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
              className="text-red-500"
              onClick={() => setDeleteBookId(value)} // Trigger delete
            >
              <FaTrash />
            </button>
          </div>
        ),
      },
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

  const handleDelete = async () => {
    if (!deleteBookId || isDeleting) return;

    setIsDeleting(true);
    try {
      await deleteBook(deleteBookId).unwrap();
      console.log("Book deleted successfully!");
      setDeleteBookId(null); // Reset after successful deletion
    } catch (error) {
      console.error("Error deleting book:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = (value) => {
    const bookData = data?.find((book) => book?._id === value);

    if (!bookData) {
      console.error("No matching book found");
      return;
    }

    navigate(`/admin/edit-book/${value}`, { state: { data: bookData } });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading books</div>;
  if (!data || data.length === 0) return <div>No books available</div>;

  return (
    <>
      <div className="w-full bg-white shadow-md rounded-lg border">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg sm:text-lg font-bold text-admin_text_grey">
            Bookings
          </h2>
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by Title"
              className="p-2 border rounded w-auto"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table
            {...getTableProps()}
            className="min-w-full divide-y divide-gray-200"
          >
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
                          : ""}
                      </span>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody
              {...getTableBodyProps()}
              className="bg-white divide-y divide-gray-200"
            >
              {page.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    key={row.id}
                    {...row.getRowProps()}
                    className="even:bg-slate-50"
                  >
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
              className="px-1 py-0 bg-admin_dark text-black rounded"
            >
              {"<<"}
            </button>
            <button
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="px-1 py-0 bg-admin_dark text-black rounded"
            >
              {"<"}
            </button>
            <span>
              Page {pageIndex + 1} of {pageOptions.length}
            </span>
            <button
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="px-1 py-0 bg-admin_dark text-black rounded"
            >
              {">"}
            </button>
            <button
              onClick={() => gotoPage(pageOptions.length - 1)}
              disabled={!canNextPage}
              className="px-1 py-0 bg-admin_dark text-black rounded"
            >
              {">>"}
            </button>
          </div>
          <select
            value={pageSize}
            onChange={(e) => setPageSize(Number(e.target.value))}
            className="border border-gray-300 rounded p-1"
          >
            {[5, 10, 20, 30, 50].map((size) => (
              <option key={size} value={size}>
                Show {size}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteBookId && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
            <p className="mb-4">Are you sure you want to delete this book?</p>
            <div className="flex justify-between">
              <button
                onClick={() => setDeleteBookId(null)}
                className="px-4 py-2 bg-gray-300 text-black rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-500 text-white rounded-md"
              >
                {isDeleting ? "Deleting..." : "Confirm"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default BooksTable;
