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
import {
  blockShopOwner,
  blockUser,
  getShopOwnersListDetails,
  getusersListDetails,
} from "../../../api/Admin/userList";

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

const UserTable = ({ selectedTab }) => {
  const [usersList, setusersList] = useState([]);
  const [TABLE_ROWS, setTABLE_ROWS] = useState([]);

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

  //to search the user
  const [searchText, setSearchText] = useState("");

  const handleInput = (e) => {
    setSearchText(e.target.value);
    const regex = new RegExp(e.target.value, "i"); // "i" flag for case-insensitive search
    const filteredList = usersList.filter((user) => regex.test(user.name));
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
                Users list
              </Typography>
              <Typography color="gray" className="mt-1 font-normal">
                See information about all users
              </Typography>
            </div>
          </div>
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="w-full md:w-72">
              <Input label="Search" value={searchText} onChange={handleInput} />
            </div>
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
      </Card>
    </>
  );
};

export default UserTable;
