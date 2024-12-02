import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useAddBookMutation } from "../../store/features/books/booksApi";
import { useFetchAllCategoriesQuery } from "../../store/features/categories/categoryApi"; // Import the category query

const BookPost = () => {
    const dispatch = useDispatch();
    const [addBook, { isLoading, isError, isSuccess, error }] = useAddBookMutation();
    const { data: categories, isLoading: categoriesLoading } = useFetchAllCategoriesQuery(); // Fetch categories
    
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            formData.append("title", data.title);
            formData.append("description", data.description);
            formData.append("category", data.category);
            formData.append("trending", data.trending);
            formData.append("oldPrice", data.oldPrice);
            formData.append("newPrice", data.newPrice);
            if (data.coverImage[0]) {
                formData.append("coverImage", data.coverImage[0]);
            }

            const response = await addBook(formData).unwrap();
            if (response) {
                alert("Book posted successfully!");
                reset();
            }
        } catch (err) {
            console.error("Failed to post the book:", err);
            alert("An error occurred while posting the book.");
        }
    };

    if (categoriesLoading) {
        return <div>Loading categories...</div>;
    }

    return (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Add a New Book</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Title */}
                <div>
                    <label htmlFor="title" className="block font-medium text-gray-700">
                        Title
                    </label>
                    <input
                        id="title"
                        type="text"
                        {...register("title", { required: "Title is required" })}
                        className={`w-full mt-1 p-2 border rounded-md focus:outline-none ${errors.title ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className="block font-medium text-gray-700">
                        Description
                    </label>
                    <textarea
                        id="description"
                        {...register("description")}
                        className="w-full mt-1 p-2 border rounded-md focus:outline-none border-gray-300"
                        rows="4"
                    ></textarea>
                </div>

                {/* Category */}
                <div>
                    <label htmlFor="category" className="block font-medium text-gray-700">
                        Category
                    </label>
                    <select
                        id="category"
                        {...register("category", { required: "Category is required" })}
                        className={`w-full mt-1 p-2 border rounded-md focus:outline-none ${errors.category ? "border-red-500" : "border-gray-300"}`}
                    >
                        <option value="">Select a category</option>
                        {categories?.data?.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.title}
                            </option>
                        ))}
                    </select>
                    {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category.message}</p>}
                </div>

                {/* Trending */}
                <div>
                    <label htmlFor="trending" className="block font-medium text-gray-700">
                        Trending
                    </label>
                    <select
                        id="trending"
                        {...register("trending", { required: "Trending is required" })}
                        className={`w-full mt-1 p-2 border rounded-md focus:outline-none ${errors.trending ? "border-red-500" : "border-gray-300"}`}
                    >
                        <option value="">Select</option>
                        <option value="true">Yes</option>
                        <option value="false">No</option>
                    </select>
                    {errors.trending && <p className="text-red-500 text-sm mt-1">{errors.trending.message}</p>}
                </div>

                {/* Cover Image */}
                <div>
                    <label htmlFor="coverImage" className="block font-medium text-gray-700">
                        Cover Image
                    </label>
                    <input
                        id="coverImage"
                        type="file"
                        {...register("coverImage")}
                        className="w-full mt-1 p-2 border rounded-md focus:outline-none border-gray-300"
                    />
                </div>

                {/* Old Price */}
                <div>
                    <label htmlFor="oldPrice" className="block font-medium text-gray-700">
                        Old Price
                    </label>
                    <input
                        id="oldPrice"
                        type="number"
                        step="0.01"
                        {...register("oldPrice", { required: "Old price is required" })}
                        className={`w-full mt-1 p-2 border rounded-md focus:outline-none ${errors.oldPrice ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.oldPrice && <p className="text-red-500 text-sm mt-1">{errors.oldPrice.message}</p>}
                </div>

                {/* New Price */}
                <div>
                    <label htmlFor="newPrice" className="block font-medium text-gray-700">
                        New Price
                    </label>
                    <input
                        id="newPrice"
                        type="number"
                        step="0.01"
                        {...register("newPrice", { required: "New price is required" })}
                        className={`w-full mt-1 p-2 border rounded-md focus:outline-none ${errors.newPrice ? "border-red-500" : "border-gray-300"}`}
                    />
                    {errors.newPrice && <p className="text-red-500 text-sm mt-1">{errors.newPrice.message}</p>}
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className={`w-full py-2 px-4 rounded-md focus:outline-none text-white ${isLoading ? "bg-gray-500 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"}`}
                        disabled={isLoading}
                    >
                        {isLoading ? "Submitting..." : "Submit"}
                    </button>
                </div>

                {/* Error Message */}
                {isError && <p className="text-red-500 text-center mt-4">{error?.data?.message || "An error occurred. Please try again."}</p>}
                {/* Success Message */}
                {isSuccess && <p className="text-green-500 text-center mt-4">Book added successfully!</p>}
            </form>
        </div>
    );
};

export default BookPost;
