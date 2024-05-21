import { useEffect, useState } from "react";
// import SinglePost from "../Post/SinglePost";
import { useDispatch, useSelector } from "react-redux";
import { getAllPost } from "../../api/post";
import { clearNewPost } from "../../Features/redux/slices/shopOwner/postSlice";
import SingleFeed from "./SingleFeed";

const Feeds = () => {
  const [allPost, setAllPost] = useState([]);
  const dispatch = useDispatch();
  const newPost = useSelector((store) => store.createPost.newPost);
  //   dispatch(clearNewPost())
  console.log("newPost redux : ", newPost);

  const user = useSelector(
    (store) => store.home.userInfo
  );

  useEffect(() => {
    if (Object.keys(newPost).length === 0) {
      getPost();
    } else {
      setAllPost([newPost, ...allPost]);
    }
  }, [newPost]);

  const getPost = async () => {
    const response = await getAllPost();
    if (response?.status === "success") {
      console.log("post  singlepost compo1111 : ", response.allPosts);
      setAllPost(response.allPosts);
    }
  };

  return (
    <div className="flex flex-col w-full h-full justify-center">
      <div className="flex items-center flex-col">
        <p className="py-12 text-xl font-semibold">Fresh Recommendations</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:px-32 ">
          {allPost.map((post) => (
            <div key={post._id}>
              <SingleFeed {...post} allPost={allPost} setAllPost={setAllPost} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feeds;
