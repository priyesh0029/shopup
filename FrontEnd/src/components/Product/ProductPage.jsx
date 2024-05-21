import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddEditProduct from "./AddEditProduct";
import { clearNewPost } from "../../Features/redux/slices/shopOwner/postSlice";
import { getAllProducts } from "../../api/ShopOwner/shopOwnerProduct";
import SingleProduct from "./SingleProduct";

const ProductPage = ({ category, catId, role }) => {
  const [allPost, setAllPost] = useState([]);
  const [open, setopen] = useState(false);
  const dispatch = useDispatch();
  const newPost = useSelector((store) => store.createPost.newPost);
  console.log("newPost redux : ", newPost, category, catId);

  const user = useSelector((store) => store.home.userInfo);

    useEffect(() => {
      if (Object.keys(newPost).length === 0) {
        getProducts();
      } else {
        setAllPost([newPost, ...allPost]);
      }
    }, [newPost]);

    const getProducts = async () => {
      const response = await getAllProducts(catId);
      if (response?.status === "success") {
        console.log("post  singlepost compo1111 : ", response.allProducts);
        setAllPost(()=>[])
        setAllPost(response.allProducts);
      }
    };

  const handleOpen = () => {
    setopen(!open);
  };

  return (
    <div className="flex flex-col w-full h-full justify-center">
      {
        (role = "shop" && (
          <div className="flex justify-end m-4">
            <button
              onClick={handleOpen}
              className="flex justify-center text-lg font-semibold border px-4 py-2 bg-blue-800 rounded-xl w-fit text-white"
            >
              Add {category}
            </button>
          </div>
        ))
      }
      <div className="flex items-center flex-col">
        <p className="py-12 text-xl font-semibold">
          {(role = "shop" ? "" : "Fresh Recommendations")}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:px-32 ">
          {allPost.map((post) => (
            <div key={post._id}>
              <SingleProduct {...post} allPost={allPost} setAllPost={setAllPost} />
            </div>
          ))}
        </div>
      </div>
      {open && (
        <AddEditProduct
          open={open}
          setOpen={setopen}
          allPost={allPost}
          setAllPost={setAllPost}
          category={category}
          catId={catId}
        />
      )}
    </div>
  );
};

export default ProductPage;
