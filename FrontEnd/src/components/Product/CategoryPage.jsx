import React, { useEffect, useState } from "react";
import { CATEGORY_URL } from "../../constants/mainUrls";
import { getAllCategoriesShop } from "../../api/ShopOwner/shopOwnerCategory";
import { useNavigate } from "react-router-dom";
import { getAllCategoriesCustomer } from "../../api/Customer/customerCategory";
import { useDispatch } from "react-redux";
import { clearNewPost } from "../../Features/redux/slices/shopOwner/postSlice";

const CategoryPage = ({ role }) => {
  const [categories, setcategories] = useState([]);
  const [catName, setcatName] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch()
  dispatch(clearNewPost())

  const handleOpen = (category, catId) => {
    if (role === "shopOwner") {
      navigate(`/shopownerproductpage/${category}/${catId}`);
    } else if (role === "customer") {
      navigate(`/customerproductpage/${category}/${catId}`);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
    let response
      if (role === "shopOwner") {
         response = await getAllCategoriesShop();
      } else if (role === "customer") {
         response = await getAllCategoriesCustomer();
      }
      console.log("Categories fetched:", response);
      if (response.status) {
        setcategories(response.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <div className="border border-gray-100 min-h-screen rounded-xl w-full h-full bg-gray-200">
      <div className="max-w-screen-2xl mx-auto p-4">
        <div className="flex justify-end mb-4"></div>
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          }}
        >
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative p-20 group rounded-lg overflow-hidden"
              onClick={() => handleOpen(category.caption, category._id)}
            >
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-110"
                style={{
                  backgroundImage: `url(${
                    CATEGORY_URL + category.imgNames[0] + ".webp"
                  })`,
                }}
              ></div>
              <div className="relative z-10 text-white border text-center bg-opacity-60 min-w-fit border-white font-extrabold text-3xl top-14 align-text-bottom">
                {category.caption}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;
