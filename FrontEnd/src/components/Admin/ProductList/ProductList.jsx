import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  Tooltip,
  Switch,
} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import moment from "moment";
import { getProductListDetails, manageProductStatus } from "../../../api/Admin/productList";
import { PRODUCT_URL } from "../../../constants/mainUrls";

const TABLE_HEAD = [
  "Posted by",
  "username",
  "E-mail",
  "Phone-number",
  "Category",
  "Product Image",
  "Product Caption",
  "Created time",
  "Price",
  "Action",
];

const ProductList = ({ selectedTab }) => {
  const [TABLE_ROWS, setTABLE_ROWS] = useState([]);
  const [products, setproducts] = useState([]);

  useEffect(() => {
    if (selectedTab === "products") {
      handleGetProductListDetails();
    }
  }, [selectedTab]);

  const handleGetProductListDetails = async () => {
    const response = await getProductListDetails();
    console.log("handleGetPostListDetails : ", response);

    setproducts(response);
    setTABLE_ROWS(response);
  };

  //to handle active or inactive state of a product

  const handleBlockUnblock = async (productId) => {
    const response = await manageProductStatus(productId);
    console.log("response : ", response);
    if (response.status) {
      if (response.state === "blocked") {
        const updatedState = products.map((product) => {
          if (product._id == productId) {
            return { ...product, isDeleted: true };
          }
          return product;
        });
        setproducts(updatedState);
        setTABLE_ROWS(updatedState);
      } else if (response.state === "unblocked") {
        const updatedState = products.map((product) => {
          if (product._id == productId) {
            return { ...product, isDeleted: false };
          }
          return product;
        });
        setproducts(updatedState);
        setTABLE_ROWS(updatedState);
      }
    }
  };

  // to search the user
  const [searchText, setSearchText] = useState("");

  const handleInput = (e) => {
    setSearchText(e.target.value);
    const regex = new RegExp(e.target.value, "i"); // "i" flag for case-insensitive search
    const filteredList = products.filter((post) =>
      regex.test(post.caption)
    );
    console.log("filteredList nwlyserche : ", filteredList);
    setTABLE_ROWS(filteredList);
  };

  return (
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Posts list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all posts
              </Typography>
            </div>
          </div>
          <div className="flex flex-col items-end justify-between gap-4 md:flex-row">
            <div className="w-full md:w-72">
              <Input label="Search" value={searchText} onChange={handleInput} />
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal leading-none opacity-70"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TABLE_ROWS.map(
                (
                  {
                    _id,
                    caption,
                    price,
                    description,
                    imgNames,
                    isDeleted,
                    createdAt,
                    shopOwnerName,
                    shopOwnerUname,
                    shopOwnerNumber,
                    shopOwnerEmail,
                    categoryName,
                  },
                  index
                ) => {
                  const isLast = index === TABLE_ROWS.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={_id}>
                      <td className={classes}>
                        <div className="flex flex-col ">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {shopOwnerName}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {shopOwnerUname}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {shopOwnerEmail}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {shopOwnerNumber}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {categoryName}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col ">
                          <Avatar
                            src={PRODUCT_URL + `${imgNames[0]}.jpg`}
                            alt="image"
                            size="lg"
                            variant="rounded"
                          />
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {caption}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col ">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {moment(createdAt).format("MMMM Do YYYY")}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            $ {price}
                          </Typography>
                        </div>
                      </td>

                      <td className={classes}>
                        <Tooltip
                          content={
                            isDeleted ? "tap to unblock" : "tap to block"
                          }
                        >
                          <Switch
                            onChange={() => handleBlockUnblock(_id)}
                            checked={isDeleted}
                            label={isDeleted ? "Inactive" : "Active"}
                          />
                        </Tooltip>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
        <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
          <Typography variant="small" color="blue-gray" className="font-normal">
            Page 1 of 10
          </Typography>
          <div className="flex gap-2">
            <Button variant="outlined" size="sm">
              Previous
            </Button>
            <Button variant="outlined" size="sm">
              Next
            </Button>
          </div>
        </CardFooter>
      </Card>
    </>
  );
};

export default ProductList;
