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
import { useEffect, useRef, useState } from "react";
import moment from "moment";
import {
  blockShopOwner,
  blockUser,
  getShopOwnersListDetails,
  getusersListDetails,
} from "../../../api/Admin/userList";
import AddOffer from "./AddOffer";
import { Autocomplete } from "@react-google-maps/api";
import { getAllCategories } from "../../../api/Admin/adminCategoty";

const USER_TABLE_HEAD = [
  "Name",
  "user name",
  "E-mail",
  "Phone number",
  "Joined by",
  "Action",
];

const SHOPOWNER_TABLE_HEAD = [
  "Name",
  "user name",
  "E-mail",
  "Phone number",
  "Address",
  "Joined by",
  "Action",
];

const OfferTable = ({ selectedTab }) => {
  const [usersList, setusersList] = useState([]);
  const [TABLE_ROWS, setTABLE_ROWS] = useState([]);
  const [open, setopen] = useState(false);

  useEffect(() => {
    if (selectedTab === "customers") {
      handleGetusersListDetails();
    } else if (selectedTab === "shopOwners") {
      handleGetShopOwnersListDetails();
    }
  }, [selectedTab]);

  const handleGetusersListDetails = async () => {
    const response = await getusersListDetails();
    setusersList(response);
    setTABLE_ROWS(response);
  };

  const handleGetShopOwnersListDetails = async () => {
    const response = await getShopOwnersListDetails();
    setusersList(response);
    setTABLE_ROWS(response);
  };

  const handleBlockUnblock = async (userId) => {
    let response;
    if (selectedTab === "shopOwners") {
      response = await blockShopOwner(userId);
    } else if (selectedTab === "customers") {
      response = await blockUser(userId);
    }
    console.log("response : ", response);
    if (response.status) {
      if (response.state === "blocked") {
        const updatedState = usersList.map((user) => {
          if (user._id == userId) {
            return { ...user, isBlock: true };
          }
          return user;
        });
        setusersList(updatedState);
        setTABLE_ROWS(updatedState);
      } else if (response.state === "unblocked") {
        const updatedState = usersList.map((user) => {
          if (user._id == userId) {
            return { ...user, isBlock: false };
          }
          return user;
        });
        setusersList(updatedState);
        setTABLE_ROWS(updatedState);
      }
    }
  };

  const handleOpen = () => {
    setopen(!open);
  };

  const [categories, setcategories] = useState([]);
  const [locationName, setlocationName] = useState("");
  const [locationCoord, setlocationCoord] = useState("");

  //location coordinates
  const autocompleteRef = useRef(null);

  const handleOriginSelect = () => {
    let place = autocompleteRef.current.getPlace();
    if (place) {
      const fromCoord = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setlocationCoord(() => fromCoord);
      const locationName = locationDetailsGenerator(place);
      setlocationName(() => locationName.address);
      console.log("places  ", fromCoord, locationName.address);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await getAllCategories();
      console.log("Categories fetched:", response);
      if (response.status) {
        setcategories(response.categories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  return (
    <>
      <Card className="h-full w-full">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <div className="mb-8 flex items-center justify-between gap-8">
            <div>
              <Typography variant="h5" color="blue-gray">
                Offers list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all offers
              </Typography>
            </div>
          </div>
          <div className="flex flex-col items-start gap-4 ">
            <div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded"
              onClick={handleOpen}
            >
              Add Offer
            </button>
            </div>
            {open && (
              <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                <div className="mb-1 flex flex-col gap-6">
                  <Input
                    size="lg"
                    placeholder="category"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    label="Category Name"
                  />

                  <Input
                    size="lg"
                    placeholder="offer discount"
                    className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                    label="Offer discount"
                  />
                  <div>
                    <Autocomplete
                      onLoad={(autocomplete) => {
                        autocompleteRef.current = autocomplete;
                      }}
                      onPlaceChanged={handleOriginSelect}
                    >
                      <>
                        <Input
                          type="text"
                          id="location"
                          label="Location"
                          value={locationName ? locationName : ""}
                          onChange={(e) => {
                            setlocationName(e.target.value);
                          }}
                          onKeyDown={(e) => {
                            if (e.key === "Backspace") {
                              setlocationName("");
                              setlocationCoord("");
                            }
                          }}
                         
                        />
                      </>
                    </Autocomplete>
                  </div>
                </div>

                <Button className="mt-6" fullWidth>
                  Submit
                </Button>
              </form>
            )}
          </div>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              {selectedTab === "shopOwners" && (
                <tr>
                  {SHOPOWNER_TABLE_HEAD.map((head) => (
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
              )}
              {selectedTab === "customers" && (
                <tr>
                  {USER_TABLE_HEAD.map((head) => (
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
              )}
            </thead>
            <tbody>
              {TABLE_ROWS.map(
                (
                  {
                    _id,
                    username,
                    name,
                    email,
                    number,
                    address,
                    createdAt,
                    isBlock,
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
                            {name}
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
                            {username}
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
                            {email}
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
                            {number}
                          </Typography>
                        </div>
                      </td>
                      {selectedTab === "shopOwners" && (
                        <td className={classes}>
                          <div className="flex flex-col ">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {address}
                            </Typography>
                          </div>
                        </td>
                      )}
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
                        <Tooltip
                          content={isBlock ? "tap to unblock" : "tap to block"}
                        >
                          <Switch
                            onChange={() => handleBlockUnblock(_id)}
                            checked={isBlock}
                            label={isBlock ? "Inactive" : "Active"}
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
        {/* {open && (
            <AddOffer handleOpen = {handleOpen} open ={open}/>
        )} */}
      </Card>
    </>
  );
};

export default OfferTable;
