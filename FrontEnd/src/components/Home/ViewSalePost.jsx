import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Button,
  Dialog,
  Carousel,
  Card,
  Typography,
  Tooltip,
  CardBody,
} from "@material-tailwind/react";
import { POST_URL } from "../../constants";
import moment from "moment";
import SaleModal from "./saleModal";
import { deletePost } from "../../api/post";

const ViewSalePost = ({
  open,
  setOpen,
  postedUser,
  imgNames,
  description,
  caption,
  createdAt,
  handleEditPost,
  postId,
  allPost,
  setAllPost
}) => {
  const handleOpen = () => setOpen(!open);
  const user = useSelector((store) => store.home.userInfo);
  const handleEditPostHelper = () => {
    handleEditPost();
    handleOpen();
  };

  const handlePostDelete = async()=>{
    const response = await deletePost(postId);
    if (response.status === 'success') {
      console.log("post Deleted");
      const updatedPostArr = allPost.filter((post) => post._id !== response.deletedPostId);
      setAllPost(updatedPostArr);
    }
  }

  return (
    <>
      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          mount: { scale: 1, y: 0 },
          unmount: { scale: 0.9, y: -100 },
        }}
        size="xl"
        className="flex flex-wrap"
      >
        <div className="w-[50%] flex-shrink-0 overflow-hidden">
          {imgNames.length !== 0 && (
            <Carousel className="">
              {imgNames.map((pic) => (
                <img
                  src={POST_URL + `${pic}.jpg`}
                  alt="image 1"
                  className="h-full w-full object-contain"
                  key={pic}
                />
              ))}
            </Carousel>
          )}
          {imgNames.length === 0 && (
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOup-Jy0ImgnokrRpPSMJEKDpILBxtjQpj7i1RBkAqMl5WbApJaslNAnF3wbIQCBstC3I&usqp=CAU"
              alt="image 1"
              className="h-full w-full object-contain"
            />
          )}
        </div>

        <div className="w-[50%] px-12 py-4 overflow-auto flex flex-col justify-between">
          <CardBody>
            <div className="mb-3 flex items-center justify-between">
              <Typography
                variant="h5"
                color="blue-gray"
                className="font-medium"
              >
                {caption}
              </Typography>
            </div>
            <Typography color="gray">{description}</Typography>
            <Typography color="gray">posted by : {postedUser}</Typography>
            <Typography color="gray">
              posted on : {moment(createdAt).startOf("minutes").fromNow()}
            </Typography>
            {user.userName === postedUser && (
              <div className="group mt-8 inline-flex flex-wrap items-center gap-3">
                <Tooltip content="Edit">
                  <span
                    onClick={handleEditPostHelper}
                    className="cursor-pointer rounded-2xl border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                      <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                    </svg>
                  </span>
                </Tooltip>
                <Tooltip content="Delete">
                  <span onClick={handlePostDelete} className="cursor-pointer rounded-2xl border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.5 4.478v.227a48.816 48.816 0 0 1 3.878.512.75.75 0 1 1-.256 1.478l-.209-.035-1.005 13.07a3 3 0 0 1-2.991 2.77H8.084a3 3 0 0 1-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 0 1-.256-1.478A48.567 48.567 0 0 1 7.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 0 1 3.369 0c1.603.051 2.815 1.387 2.815 2.951Zm-6.136-1.452a51.196 51.196 0 0 1 3.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 0 0-6 0v-.113c0-.794.609-1.428 1.364-1.452Zm-.355 5.945a.75.75 0 1 0-1.5.058l.347 9a.75.75 0 1 0 1.499-.058l-.346-9Zm5.48.058a.75.75 0 1 0-1.498-.058l-.347 9a.75.75 0 0 0 1.5.058l.345-9Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                </Tooltip>
              </div>
            )}
          </CardBody>
        </div>
      </Dialog>
    </>
  );
};
export default ViewSalePost;
