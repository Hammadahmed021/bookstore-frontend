import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFetchCategoryByIdQuery } from "../store/features/categories/categoryApi";
import BookCard from "../components/BookCard";

const CategorySingle = () => {
  const { id } = useParams(); // Extract category ID from URL
  const [products, setProducts] = useState([]);

  // Fetch category data based on the ID
  const { data: getProducts, isLoading, error } = useFetchCategoryByIdQuery(id);

  console.log(getProducts, "getProducts");

  // Update products state when the data is fetched
  useEffect(() => {
    if (getProducts?.data?.products) {
      setProducts(getProducts.data.products); // Set products from fetched data
    }
  }, [getProducts]); // Only rerun effect when getProducts changes

  // Loading and error handling
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div>
      <h2 className="text-2xl  mb-6">
        <span className="font-semibold">Category:</span>{" "}
        <span className="text-medium text-lg">
          {getProducts?.data?.category?.title}
        </span>{" "}
        <span className="text-medium text-lg">
          ({getProducts?.data?.products?.length})
        </span>
      </h2>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-3">
        {products?.map((product) => (
          <BookCard key={product._id} props={product} />
        ))}
      </div>
    </div>
  );
};

export default CategorySingle;
