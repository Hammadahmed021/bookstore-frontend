import React, { useState } from "react";
import {
  useFetchAllCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../store/features/categories/categoryApi";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { getImgUrl } from "../../utils/getImage";

const AdminCategory = () => {
  const { data: categories, isLoading, refetch } = useFetchAllCategoriesQuery();
  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [editingCategory, setEditingCategory] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      image: null,
    },
  });

  const watchImage = watch("image");

  const onSubmit = async (formData) => {
    const { title, image } = formData;
    
    // Prepare FormData payload
    const formDataPayload = new FormData();
    formDataPayload.append("title", title);
    if (image && image[0]) {
      formDataPayload.append("image", image[0]); // For file upload
    }
  
    try {
      if (editingCategory) {
        // When editing a category, send the correct id and formData
        await updateCategory({
          id: editingCategory._id,
          title, // Send title as plain text
          image: image ? image[0] : null, // Send image as file
        }).unwrap();
        alert("Category updated successfully!");
      } else {
        // Adding a new category
        await addCategory(formDataPayload).unwrap();
        alert("Category added successfully!");
      }
  
      reset();
      setEditingCategory(null);
      refetch();
    } catch (error) {
      alert(`Something went wrong: ${error?.data?.message || error.message}`);
    }
  };
  
  
  

  const handleEdit = (category) => {
    setEditingCategory(category);
    setValue("title", category.title);
    setValue("image", null); // Reset file input as it cannot be pre-filled
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        await deleteCategory(id).unwrap();
        alert("Category deleted successfully!");
        refetch();
      } catch (error) {
        alert(`Failed to delete category: ${error?.data?.message || error.message}`);
      }
    }
  };

  if (isLoading) return <p>Loading categories...</p>;

  return (
    <div className="">
    <h1 className="text-xl font-semibold mb-4">Category Management</h1>

    <form onSubmit={handleSubmit(onSubmit)} className="mb-6">
      <div className="mb-4">
        <label className="block mb-1 font-medium">Title</label>
        <input
          type="text"
          {...register("title", { required: "Title is required" })}
          placeholder="Category title"
          className="w-full border rounded p-2"
        />
        {errors?.title && <p className="text-red-500">{errors?.title?.message}</p>}
      </div>
      <div className="mb-4">
        <label className="block mb-1 font-medium">Image</label>
        <input
          type="file"
          {...register("image")}
          className="w-full border rounded p-2"
          accept="image/*"
        />
        {watchImage && watchImage[0] && (
          <img
            src={URL.createObjectURL(watchImage[0])}
            alt="Preview"
            className="h-20 w-20 object-cover mt-2"
          />
        )}
        {errors?.image && <p className="text-red-500">{errors?.image?.message}</p>}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        {editingCategory ? "Update Category" : "Add Category"}
      </button>
      {editingCategory && (
        <button
          type="button"
          onClick={() => {
            reset();
            setEditingCategory(null);
          }}
          className="bg-gray-500 text-white py-2 px-4 ml-2 rounded hover:bg-gray-600"
        >
          Cancel
        </button>
      )}
    </form>

    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-100">
          <th className="border border-gray-300 p-2">Title</th>
          <th className="border border-gray-300 p-2">Image</th>
          <th className="border border-gray-300 p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {categories?.data.map((category) => (
          <tr key={category._id}>
            <td className="border border-gray-300 p-2">{category.title}</td>
            <td className="border border-gray-300 p-2">
              {category.image ? (
                <img
                  src={getImgUrl(category.image)}
                  alt={category.title}
                  className="h-10 w-10 object-cover"
                />
              ) : (
                "No Image"
              )}
            </td>
            <td className="border border-gray-300 p-2 text-center">
              <button
                onClick={() => handleEdit(category)}
                className="text-blue-500 mr-2"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleDelete(category._id)}
                className="text-red-500"
              >
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default AdminCategory;
