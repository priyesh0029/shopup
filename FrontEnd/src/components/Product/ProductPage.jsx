import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddEditProduct from "./AddEditProduct";
import { clearNewPost } from "../../Features/redux/slices/shopOwner/postSlice";
import { getAllProducts } from "../../api/ShopOwner/shopOwnerProduct";
import SingleProduct from "./SingleProduct";
import { fetchCustomerProducts } from "../../api/Customer/getCustomerProducts";
import UserProductPage from "./UserProductPage";

const ProductPage = ({ category, catId, role }) => {
  const [allPost, setAllPost] = useState([]);
  const [open, setopen] = useState(false);
  const dispatch = useDispatch();
  const newPost = useSelector((store) => store.createPost.newPost);
  console.log("newPost redux : ", newPost, category, catId);

  const user = useSelector((store) => store.home.userInfo);

  if (role === "shop") {
    useEffect(() => {
      if (Object.keys(newPost).length === 0) {
        getShopProducts();
      } else {
        setAllPost([newPost, ...allPost]);
      }
    }, [newPost]);
  } else if (role === "customer") {
    useEffect(() => {
      getCustomerProducts();
    }, []);
  }

  //TO GET SHOP OWNERS PRODUCTS
  const getShopProducts = async () => {
    const response = await getAllProducts(catId);
    if (response?.status === "success") {
      console.log("post  singlepost compo1111 : ", response.allProducts);
      setAllPost(() => []);
      setAllPost(response.allProducts);
    }
  };

  //TO GET USER PRODUCTS
  const getCustomerProducts = async () => {
    const response = await fetchCustomerProducts(catId);
    console.log("getCustomerProducts response : ", response);
    if (response.status) {
      setAllPost(response.products);
    }
  };

  const handleOpen = () => {
    setopen(!open);
  };

  return (
    <div className="flex flex-col w-full h-full justify-center">
      {role === "shop" ? (
        <div className="flex justify-end m-4">
          <button
            onClick={handleOpen}
            className="flex justify-center text-lg font-semibold border px-4 py-2 bg-blue-800 rounded-xl w-fit text-white"
          >
            Add {category}
          </button>
        </div>
      ) : (
        <div className="flex justify-start m-14">
          <p className="font-semibold text-2xl text-black">
            {category} near you
          </p>
        </div>
      )}
      {role === "shop" && (
        <div className="flex items-center flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:px-32 ">
            {allPost.map((post) => (
              <div key={post._id}>
                <SingleProduct
                  {...post}
                  allPost={allPost}
                  setAllPost={setAllPost}
                />
              </div>
            ))}
          </div>
        </div>
      )}
      {role === "customer" && allPost.length !== 0 &&(
        <div className="mx-10">
          <UserProductPage products={allPost}/>
        </div>
      )}
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
