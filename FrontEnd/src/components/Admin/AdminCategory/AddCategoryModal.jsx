import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Carousel,
} from "@material-tailwind/react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import {
  clearCaption,
  clearMedia,
  setCaption,
  setMedia,
} from "../../../Features/redux/slices/shopOwner/postSlice";
import { useDispatch, useSelector } from "react-redux";
import { creatCategotry } from "../../../api/Admin/adminCategoty";

const AddCategoryModal = ({ open, setOpen, handleOpen,setcategories ,categories}) => {
  const [imageSelect, setimageSelect] = useState(false);
  const [caption, setcaption] = useState("");
  const [imageArr, setimageArr] = useState([]);

  //   const dispatch = useDispatch();
  //   const images = useSelector((store) => store.createPost.media);
  //   const captionPost = useSelector((store) => store.createPost.caption);

  const handleFileChange = (event) => {
    const selectedFiles = event.target.files;
    console.log(selectedFiles);
    if (selectedFiles) {
      const filesArray = Object.values(selectedFiles);
      //   dispatch(setMedia(filesArray));
      //   console.log(filesArray);
      setimageArr(selectedFiles);
      setimageSelect(true);
    }
  };
  //   useEffect(() => {
  //     // if (Object.keys(initialData).length !== 0) {
  //     //   setimageArr(() => initialData.imgNames);
  //     //   setdesc(()=>initialData.description)
  //     //   setcaption(()=>initialData.caption)
  //     // } else {
  //     setimageArr(() => images);
  //     // }
  //   }, [imageSelect]);

  const captionHandle = (event) => {
    const updatedCaptionInput = event.target.value;
    console.log("caption input before dispatch : ", updatedCaptionInput);
    setcaption(() => event.target.value);
    // dispatch(setCaption(event.target.value));
  };

  const submitHandler = async () => {
    try {
      //   if (Object.keys(initialData).length !== 0) {
      //     let response = await updatePost(caption,desc,initialData._id);

      //       dispatch(clearCaption());
      //       dispatch(clearDesc());
      //       const updatedPostArr = allPost.map((post) => {
      //         if (post._id === response._id) {
      //             post.caption = response.caption;
      //             post.description = response.description;
      //         }
      //         return post;
      //     });
      //     setAllPost(()=>updatedPostArr)
      //       handleOpen();

      //   } else {
      const formData = new FormData();
      const imageFiles = [...imageArr]  
      imageFiles.forEach((file) => {
        formData.append(`image`, file);
      });
      formData.append(`caption`, caption);

      formData.forEach((key, value) => {
        console.log("post in front end formdata key and value  : ", key, value);
      });

      let response = await creatCategotry(formData);
      if (response.status) {
        setimageArr([]);
        // setcaption("clearCaption()");
        // dispatch(setNewPost(response.post));
        setcategories([...categories,response.data])
        handleOpen();
      }
      //   }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add New Category</DialogHeader>
        <DialogBody className="flex flex-col items-center">
          <div className="relative group h-96 w-96 ">
            {imageArr.length !== 0 ? (
              <img
                //   src={
                //     Object.keys(initialData).length !== 0
                //       ? POST_URL + `${pic}`
                //       : URL.createObjectURL(pic)
                //   }
                src={URL.createObjectURL(imageArr[0])}
                alt="image 1"
                className="h-full w-full object-contain"
              />
            ) : (
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOup-Jy0ImgnokrRpPSMJEKDpILBxtjQpj7i1RBkAqMl5WbApJaslNAnF3wbIQCBstC3I&usqp=CAU"
                alt="image 1"
                className="h-full w-full object-contain"
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="relative">
                <input
                  type="file"
                  name="image"
                  className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                />
                <PencilSquareIcon class="h-16 w-16 text-black" />
              </div>
            </div>
          </div>
          <div className="flex gap-2 justify-center">
            <div>
              {" "}
              <Input
                size="lg"
                placeholder="Enter your category name"
                //   value={initialData !== null ? caption : ""}
                className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                labelProps={{
                  className: "before:content-none after:content-none",
                }}
                onChange={captionHandle}
              />
            </div>
            <div>
              <Button variant="gradient" color="green" onClick={submitHandler}>
                <span>Confirm</span>
              </Button>
            </div>
          </div>
        </DialogBody>
      </Dialog>
    </>
  );
};

export default AddCategoryModal;
