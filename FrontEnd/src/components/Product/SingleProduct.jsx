import {
    Card,
    CardHeader,
    Carousel,
    Tooltip,
  } from "@material-tailwind/react";
  

import {
    BookmarkIcon as SolidBookmarkIcon,
    UserCircleIcon,
  } from "@heroicons/react/20/solid";
  import { useEffect, useState } from "react";
  import moment from "moment";
  import { useDispatch, useSelector } from "react-redux";
  import { Link } from "react-router-dom";
  import { PRODUCT_URL } from "../../constants/mainUrls"
//   import ViewSalePost from "./ViewSalePost";
//   import SaleModal from "./saleModal";


  

const SingleProduct = (props) => {
    const {
      _id,
      imgNames,
      description,
      createdAt,
      caption,
    } = props;
  
    const [viewPost, setviewPost] = useState(false);
    const handleOpen = () => setviewPost(!viewPost);
  
    //edit feed
    const [initialData, setinitialData] = useState({});
    const [openEdit, setopenEdit] = useState(false);
    const handleEditPost = () => {
      const intaialData = {
        postedUser,
        imgNames,
        description,
        caption,
        createdAt,
        _id,
      };
      setinitialData(() => intaialData);
      setopenEdit(() => !openEdit);
      handleOpen();
    };
  
    return (
      <>
        <Tooltip content="click the decription to view the full details..">
          <Card className="mt-6 border-1 rounded-md border-black flex flex-col w-full md:max-w-md lg:max-w-lg">
            <CardHeader className="relative rounded-sm h-64 md:h-72 lg:h-80">
                <div className="flex justify-between px-2">
                 <div className="flex">
                 <UserCircleIcon className="h-10 w-10 text-gray-700" />
                 </div>
                  <div className="flex ">
                    <p className="text-sm p-1">
                      {moment(createdAt).startOf("minutes").fromNow()}
                    </p>
                  </div>
                </div>
  
                {/* {openEdit && (
                  <SaleModal
                    open={openEdit}
                    setOpen={setopenEdit}
                    initialData={initialData}
                    allPost={allPost}
                    setAllPost={setAllPost}
                  />
                )}
                {viewPost && (
                  <ViewSalePost
                    open={viewPost}
                    setOpen={setviewPost}
                    caption={caption}
                    createdAt={createdAt}
                    description={description}
                    imgNames={imgNames}
                    postedUser={postedUser}
                    handleEditPost={handleEditPost}
                    postId={_id}
                    allPost={allPost}
                    setAllPost={setAllPost}
                  />
                )} */}
              <Carousel className="rounded-sm items-center">
                {imgNames.map((pic) => (
                  <img
                    src={PRODUCT_URL + `${pic}.jpg`}
                    alt="image 1"
                    className="h-full w-full object-cover"
                    key={pic}
                  />
                ))}
              </Carousel>
            </CardHeader>
  
            <div className="py-5 px-5 flex flex-col " onClick={handleOpen}>
              <p className="text-lg font-semibold text-black">{caption}</p>
            </div>
          </Card>
        </Tooltip>
      </>
    );
  };
  

export default SingleProduct