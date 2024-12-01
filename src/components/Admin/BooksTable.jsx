import React, { useState, useMemo } from "react";
import { useTable, useSortBy, usePagination, useGlobalFilter } from "react-table";
import { FaEdit, FaTrash } from "react-icons/fa";


const BooksTable = ({ data = [], loading, error }) => {
    const [search, setSearch] = useState("");

    const [deleteBookId, setDeleteBookId] = useState(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const filteredData = useMemo(
        () =>
            data.filter((books) => {
                const booknames = books?.title || "";
                return (
                    booknames.toLowerCase().includes(search.toLowerCase())
                );
            }),
        [data, search]
    );

    // Fetch data from API

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
                accessor: "id",
                Cell: ({ value }) => (
                    <div className="flex justify-center">
                        <button className="text-blue-500 mr-2">
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
            data: filteredData,
            initialState: { pageIndex: 0, pageSize: 5 },
        },
        useSortBy,
        usePagination
    );

    // Handle delete action with a confirmation modal
    const handleDelete = async () => {
        if (!deleteBookId || isDeleting) return; // Prevent multiple delete calls

        setIsDeleting(true); // Start deletion process
        try {
            console.log("Deleting book with id:", deleteBookId);
            // Simulate a delay (replace with your delete API call logic)
            setTimeout(() => {
                console.log("Book deleted successfully!");
                setDeleteBookId(null); // Reset deleteBookId after deletion
            }, 1000); // Simulated delay
        } catch (error) {
            console.error("Error deleting book:", error);
        } finally {
            setIsDeleting(false); // Stop the deleting state
        }
    };

    return (
        <>
            <div className="w-full bg-white shadow-md rounded-lg">
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg sm:text-lg font-bold text-admin_text_grey">
                        Bookings
                    </h2>
                    <div className="relative">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by Restaurant Name or User Name"
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
                                                    : "🔽"}
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
                            {page.map((row, index) => {
                                prepareRow(row);
                                return (
                                    <tr
                                        key={row.id}
                                        {...row.getRowProps()}
                                        className={"bg-slate-100"}
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
                        className="px-1 py-0 bg-admin_dark text-white rounded"
                    >
                        {"<<"}
                    </button>
                    <button
                        onClick={() => previousPage()}
                        disabled={!canPreviousPage}
                        className="px-1 py-0 bg-admin_dark text-white rounded"
                    >
                        {"<"}
                    </button>
                    <span>
                        Page{" "}
                        <strong>
                            {pageIndex + 1} of {pageOptions.length}
                        </strong>{" "}
                    </span>
                    <button
                        onClick={() => nextPage()}
                        disabled={!canNextPage}
                        className="px-1 py-0 bg-admin_dark text-white rounded"
                    >
                        {">"}
                    </button>
                    <button
                        onClick={() => gotoPage(pageOptions.length - 1)}
                        disabled={!canNextPage}
                        className="px-1 py-0 bg-admin_dark text-white rounded"
                    >
                        {">>"}
                    </button>
                </div>
                <select
                    value={pageSize}
                    onChange={(e) => setPageSize(Number(e.target.value))}
                    className="border border-gray-300 rounded p-1"
                >
                    {[5, 10, 20, 30, 40, 50, 60, 70, 80, 90, 99].map((size) => (
                        <option key={size} value={size}>
                            Show {size}
                        </option>
                    ))}
                </select>
            </div>
        </div >

            {/* Delete Confirmation Modal */ }
    {
        deleteBookId && !isDeleting && (
            <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                    <h2 className="text-xl font-bold mb-4">Confirm Delete</h2>
                    <p className="mb-4">Are you sure you want to delete this book?</p>
                    <div className="flex justify-between">
                        <button
                            onClick={() => setDeleteBookId(null)} // Close the modal
                            className="px-4 py-2 bg-gray-300 text-black rounded-md"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete} // Confirm and delete
                            className="px-4 py-2 bg-red-500 text-white rounded-md"
                        >
                            Confirm
                        </button>
                    </div>
                </div>
            </div>
        )
    }
        </>

    );
};

export default BooksTable;


