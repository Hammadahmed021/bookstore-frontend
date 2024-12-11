import React, { useEffect, useState } from "react";
import { useFetchAllBooksQuery } from "../store/features/books/booksApi";
import { useFetchAllCategoriesQuery } from "../store/features/categories/categoryApi";
import BookCard from "../components/BookCard";

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [priceRange, setPriceRange] = useState([0, 100]);
    const [sortOrder, setSortOrder] = useState("");
    const [visibleProducts, setVisibleProducts] = useState(6);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const { data: getProducts = [], isLoading, error } = useFetchAllBooksQuery();
    const { data: categories } = useFetchAllCategoriesQuery();

    useEffect(() => {
        if (getProducts) {
            setProducts(getProducts);
            setFilteredProducts(getProducts);
        }
    }, [getProducts]);

    useEffect(() => {
        let filtered = [...products];

        // Filter by selected categories
        if (selectedCategories.length > 0) {
            filtered = filtered.filter((product) =>
                selectedCategories.includes(product.category)
            );
        }

        // Filter by price range
        filtered = filtered.filter(
            (product) =>
                product.newPrice >= priceRange[0]
        );

        // Sort products
        if (sortOrder === "asc") {
            filtered.sort((a, b) => a.newPrice - b.newPrice);
        } else if (sortOrder === "desc") {
            filtered.sort((a, b) => b.newPrice - a.newPrice);
        }

        setFilteredProducts(filtered);
    }, [selectedCategories, priceRange, sortOrder, products]);

    const handleCategoryChange = (categoryId) => {
        setSelectedCategories((prev) =>
            prev.includes(categoryId)
                ? prev.filter((id) => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const handleLoadMore = () => {
        setIsLoadingMore(true);
        setTimeout(() => {
            setVisibleProducts((prev) => prev + 6);
            setIsLoadingMore(false);
        }, 1000); // Simulate a loading delay
    };

    const resetFilters = () => {
        setSelectedCategories([]);
        setPriceRange([0, 100]);
        setSortOrder("");
        setVisibleProducts(6);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading products</div>;

    return (
        <div className="py-10">
            <h2 className="text-2xl mb-6">
                <span className="font-semibold">Shop:</span>{" "}
                <span className="text-medium text-lg">
                    ({getProducts?.length})
                </span>
            </h2>
            <div className="grid grid-cols-12 gap-8 relative">
                {/* Filter Section */}
                <div className="col-span-12 md:col-span-3 sticky top-0">
                    <h3 className="text-xl font-semibold mb-4">All Filters</h3>

                    {/* Categories Filter */}
                    <div className="mb-6">
                        <h4 className="font-medium mb-2">Categories</h4>
                        {categories?.data?.map((category) => (
                            <div key={category._id} className="mb-2">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        value={category._id}
                                        onChange={() => handleCategoryChange(category._id)}
                                        checked={selectedCategories.includes(category._id)}
                                    />
                                    <span>{category.title}</span>
                                </label>
                            </div>
                        ))}
                    </div>
                    {/* Sorting Options */}
                    <div className="mb-6">
                        <h4 className="font-medium mb-2">Sort By</h4>
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="border p-2 rounded w-full"
                        >
                            <option value="">Select</option>
                            <option value="asc">Price: Low to High</option>
                            <option value="desc">Price: High to Low</option>
                        </select>
                    </div>

                    {/* Price Range Filter */}
                    <div className="mb-6">
                        <h4 className="font-medium mb-2">Price Range</h4>
                        <div className="flex flex-col items-center">
                            <div className="flex justify-between w-full mt-2 text-sm">
                                <span>${priceRange[0]}</span>
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={priceRange[0]}
                                onChange={(e) =>
                                    setPriceRange([+e.target.value, priceRange[1]])
                                }
                                className="w-full"
                            />
                        </div>
                    </div>



                    {/* Reset Filters Button */}
                    <div className="text-center mt-8 border-t pt-6">
                        <button
                            onClick={resetFilters}
                            className="bg-gray-300 block w-full border rounded-lg text-black px-6 py-2 hover:bg-opacity-80"
                        >
                            Reset Filters
                        </button>
                    </div>
                </div>

                {/* Product Cards Section */}
                <div className="col-span-12 md:col-span-9 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {filteredProducts?.slice(0, visibleProducts)?.map((product) => (
                        <BookCard key={product._id} props={product} />
                    ))}
                    <div className="">
                        {/* Load More Button */}
                        {visibleProducts < filteredProducts.length && (
                            <div className="text-center mt-8">
                                <button
                                    onClick={handleLoadMore}
                                    className="bg-secondary border rounded-lg text-white px-6 py-2  hover:bg-opacity-80 flex items-center justify-center"
                                >
                                    {isLoadingMore ? (
                                        <div className="loader spinner-border animate-spin border-white border-4 rounded-full w-4 h-4 mr-2"></div>
                                    ) : null}
                                    {isLoadingMore ? "Loading..." : "Load More"}
                                </button>
                            </div>
                        )}
                    </div>
                    {/* No Products Message */}
                    {filteredProducts?.length === 0 && (
                        <div className="col-span-full text-center text-gray-500">
                            No products found.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Shop;
