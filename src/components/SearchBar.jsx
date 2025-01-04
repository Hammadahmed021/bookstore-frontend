import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const SearchBar = ({ books }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  // Debounce the search query to avoid showing the list immediately
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // Wait for 500ms after the user stops typing

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Filter books based on the debounced search query
  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(debouncedQuery.toLowerCase())
  );

  return (
    <div className="relative sm:w-72 w-40 space-x-2">
      <CiSearch className="absolute inline-block left-3 inset-y-2 text-gray-500" size={22} />
      <input
        type="text"
        placeholder="Search here..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="bg-[#f0f0f0] py-2 w-full focus:outline-none px-6 md:px-8 rounded-md placeholder-gray-500"
      />

      {/* Show results only if searchQuery is not empty */}
      {debouncedQuery && (
        <div className="mt-2 max-h-60 overflow-y-auto bg-white shadow-lg rounded-md absolute z-10 w-full">
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <Link to={`/book/${book._id}`} key={book._id}>
                <div className="p-2 border-b hover:bg-gray-100">
                  <span className="text-gray-800">{book.title}</span>
                </div>
              </Link>
            ))
          ) : (
            <div className="p-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
