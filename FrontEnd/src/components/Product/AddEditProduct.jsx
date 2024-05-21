import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  Carousel,
  Card,
  Typography,
  Input,
  Textarea,
} from "@material-tailwind/react";
import {
  clearCaption,
  clearDesc,
  clearMedia,
  clearPrice,
  setCaption,
  setDesc,
  setMedia,
  setNewPost,
  setPrice,
} from "../../Features/redux/slices/shopOwner/postSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { createPost, updatePost } from "../../api/post";
import { POST_URL } from "../../constants/mainUrls"
import { createProduct } from "../../api/ShopOwner/shopOwnerProduct";


const AddEditProduct = ({ open, setOpen, initialData = {},allPost ,setAllPost,category,catId}) => {
    const handleOpen = () => setOpen(!open);
    const [imageSelect, setimageSelect] = useState(false);
    const dispatch = useDispatch();
    const [imageArr, setimageArr] = useState([]);
    const handleFileChange = (event) => {
      const selectedFiles = event.target.files;
      console.log(selectedFiles);
      if (selectedFiles) {
        const filesArray = Object.values(selectedFiles);
        dispatch(setMedia(filesArray));
        console.log(filesArray);
        setimageSelect(true);
      }
    };
  
    const [desc, setdesc] = useState("")
    const [caption, setcaption] = useState("")
    const [price, setprice] = useState("")
    const images = useSelector((store) => store.createPost.media);
    const mediaPost = useSelector((store) => store.createPost.media);
    const captionPost = useSelector((store) => store.createPost.caption);
    const pricePost = useSelector((store) => store.createPost.price);
    const descPost = useSelector((store) => store.createPost.desc);
    const shopOwnerId = useSelector((store)=> store.shopInfo._id) 
  
    useEffect(() => {
      if (Object.keys(initialData).length !== 0) {
        setimageArr(() => initialData.imgNames);
        setdesc(()=>initialData.description)
        setcaption(()=>initialData.caption)
      } else {
        setimageArr(() => images);
      }
    }, [imageSelect]);
  
    const captionHandle = (event) => {
      const updatedCaptionInput = event.target.value;
      console.log("caption input before dispatch : ", updatedCaptionInput);
      setcaption(()=>event.target.value)
      dispatch(setCaption(event.target.value));
    };

    const priceHandle = (event) => {
        const updatedCaptionInput = event.target.value;
        console.log("caption input before dispatch : ", updatedCaptionInput);
        setprice(()=>event.target.value)
        dispatch(setPrice(event.target.value));
      };
  
    const captionDesc = (event) => {
      const updatedCaptionInput = event.target.value;
      console.log("desc input before dispatch : ", updatedCaptionInput);
      setdesc(()=>event.target.value)
      dispatch(setDesc(event.target.value));
    };
  
    const submitHandler = async () => {
      try {
        if (Object.keys(initialData).length !== 0) {
          let response = await updatePost(caption,desc,initialData._id);
          
            dispatch(clearCaption());
            dispatch(clearDesc());
            const updatedPostArr = allPost.map((post) => {
              if (post._id === response._id) {
                  post.caption = response.caption;
                  post.description = response.description;
              }
              return post;
          });
          setAllPost(()=>updatedPostArr)
            handleOpen();
  
          
        } else {
          const formData = new FormData();
  
          mediaPost.forEach((file) => {
            formData.append(`image`, file);
          });
          formData.append(`caption`, captionPost);
          formData.append(`description`, descPost);
          formData.append(`price`, pricePost);
          formData.append(`shopOwnerId`, shopOwnerId);
          formData.append(`catId`, catId);
          

  
          formData.forEach((key, value) => {
            console.log(
              "post in front end formdata key and value  : ",
              key,
              value
            );
          });
  
          let response = await createProduct(formData);
          if (response.status) {
            dispatch(clearMedia());
            dispatch(clearCaption());
            dispatch(clearDesc());
            dispatch(clearPrice())
            dispatch(setNewPost(response.product));
            handleOpen();
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
  
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
            {imageArr.length !== 0 && (
              <Carousel className="">
                {imageArr.map((pic) => (
                  <img
                    src={
                      Object.keys(initialData).length !== 0
                        ? POST_URL + `${pic}`
                        : URL.createObjectURL(pic)
                    }
                    alt="image 1"
                    className="h-full w-full object-contain"
                    key={pic}
                  />
                ))}
              </Carousel>
            )}
            {imageArr.length === 0 && (
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOup-Jy0ImgnokrRpPSMJEKDpILBxtjQpj7i1RBkAqMl5WbApJaslNAnF3wbIQCBstC3I&usqp=CAU"
                alt="image 1"
                className="h-full w-full object-contain"
              />
            )}
          </div>
  
          <div className="w-[50%] px-12 py-4 overflow-auto flex flex-col justify-between">
            <Card color="transparent" shadow={false}>
              <Typography variant="h4" color="blue-gray">
                Post your {category} details
              </Typography>
              <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                  {Object.keys(initialData).length === 0 && (
                    <div className="relative">
                      <input
                        type="file"
                        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
                        multiple
                        onChange={handleFileChange}
                      />
                      <div className="px-4 py-1 mt-4 text-center bg-blue-600 text-white rounded-md shadow-md hover:bg-gray-300 transition">
                        Add Images
                      </div>
                    </div>
                  )}
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    AD Titile
                  </Typography>
                  <Input
                    size="lg"
                    placeholder="Enter your Ad title.."
                    value={initialData !== null ? caption : ""}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={captionHandle}
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                   Price
                  </Typography>
                  <Input
                    size="sm"
                    placeholder="Enter your Ad price.."
                    value={initialData !== null ? price : ""}
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    labelProps={{
                      className: "before:content-none after:content-none",
                    }}
                    onChange={priceHandle}
                  />
                  <Typography variant="h6" color="blue-gray" className="-mb-3">
                    Description
                  </Typography>
                  <Textarea
                    size="lg"
                    label="Enter your post description"
                    value={initialData !== null ? desc : ""}
                    onChange={captionDesc}
                  />
                </div>
  
                <Button className="mt-6" size="sm" onClick={submitHandler}>
                  {Object.keys(initialData).length !== 0 ? "Repost Now " : "Post Now "}
                </Button>
              </form>
            </Card>
          </div>
        </Dialog>
      </>
    );
}
export default AddEditProduct