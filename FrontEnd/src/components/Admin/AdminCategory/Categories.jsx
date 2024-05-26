import React, { useEffect, useState } from "react";
import { CATEGORY_URL, POST_URL2 } from "../../../constants/mainUrls";
import AddCategoryModal from "./AddCategoryModal";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import { getAllCategories } from "../../../api/Admin/adminCategoty";

const Categories = () => {

  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(!open);
  const [categories, setcategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await getAllCategories();
      console.log("Categories fetched:", response);
      if (response.status) {
        setcategories(response.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };
  return (
    <div className="max-w-screen-2xl mx-auto p-4">
      <div className="flex justify-end mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={handleOpen}
        >
          Add Category
        </button>
        {open && (
          <AddCategoryModal
            setOpen={setOpen}
            open={open}
            handleOpen={handleOpen}
            setcategories={setcategories}
            categories={categories}
          />
        )}
      </div>
      <div
        className="grid gap-4"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}
      >
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative p-20 group rounded-lg"
            style={{
              backgroundImage: `url(${
                CATEGORY_URL + category.imgNames[0] + ".webp"
              })`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              transition: "opacity 0.3s",
            }}
          >
            <div className="absolute inset-0 rounded-lg bg-gray-300 opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 space-x-4">
              <PencilSquareIcon className="h-10 w-10 text-green-900" />
              <TrashIcon className="h-10 w-10 text-red-900" />
            </div>
            <div className="relative z-10 text-white border text-center  bg-opacity-60  border-white font-extrabold text-3xl top-14  align-text-bottom ">
              {category.caption}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
