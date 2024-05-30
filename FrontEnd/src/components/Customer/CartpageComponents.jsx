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
import { PRODUCT_URL } from "../../constants/mainUrls";
import { getCartListDetails } from "../../api/Customer/customerCartconnections";

const TABLE_HEAD = ["Product Image", "Product Name", "Quantity", "Price"];

const CartpageComponents = () => {
  const [TABLE_ROWS, setTABLE_ROWS] = useState([]);
  const [products, setproducts] = useState([]);

  useEffect(() => {
    handleGetCartListDetails();
  }, []);

  const handleGetCartListDetails = async () => {
    const response = await getCartListDetails();
    console.log("handleGetPostListDetails : ", response);

    setproducts(response.cartlist);
    setTABLE_ROWS(response.cartlist);
  };

  return (
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Cart list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See all carted items
              </Typography>
            </div>
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          {TABLE_ROWS.length < 0 ? (
            <div>cart empty</div>
          ) : (
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
                  ({ _id, caption, price, imgNames, quantity }, index) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={_id}>
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
                              {quantity}
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
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default CartpageComponents;
