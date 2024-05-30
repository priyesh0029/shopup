import React, { useState } from "react";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { Square3Stack3DIcon, UserCircleIcon } from "@heroicons/react/24/solid";
// import { POST_URL } from "../../../constants/constants";
// import DashBoardComponent from "../DashBoard/DashBoard";
// import UserTable from "../UsersList/UsersList";
import {
  ArrowLeftOnRectangleIcon,
  ChatBubbleLeftRightIcon,
  PhotoIcon,
} from "@heroicons/react/20/solid";
// import PostTable from "../ReportedPost/PostList";
// import ReportedComments from "../ReportedComment/ReportedComments";
import { useDispatch } from "react-redux";
// import { clearAdminTokenSlice } from "../../../features/redux/slices/admin/adminTokenSlice";
import { useNavigate } from "react-router-dom";
import { POST_URL2 } from "../../../constants/mainUrls";
import Categories from "../AdminCategory/Categories";
import DashBoardComponent from "./DashboardComponent";
import UserTable from "../UserList/UserTable";
import ProductList from "../ProductList/ProductList";
import OfferTable from "../Offers/OfferList";

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState("");

  const handleTabClick = (value) => {
    setSelectedTab(value);
  };

  const data = [
    {
      label: "Dashboard",
      value: "dashboard",
      icon: Square3Stack3DIcon,
      desc: <DashBoardComponent selectedTab={selectedTab}/>,
    },
    {
      label: "Customers",
      value: "customers",
      icon: UserCircleIcon,
      desc: <UserTable selectedTab={selectedTab}/>,
    },
    {
      label: "Shop-Owners",
      value: "shopOwners",
      icon: PhotoIcon,
      desc: <UserTable selectedTab={selectedTab}/>,
    },
    {
      label: "Catergories",
      value: "catergories",
      icon: ChatBubbleLeftRightIcon,
      desc: <Categories selectedTab={selectedTab} />,
    },
    {
      label: "Products",
      value: "products",
      icon: ChatBubbleLeftRightIcon,
       desc: <ProductList selectedTab={selectedTab}/>,
    },
    {
      label: "Offers",
      value: "offers",
      icon: ChatBubbleLeftRightIcon,
      desc: <OfferTable selectedTab={selectedTab}/>,
    },
    
  ];

  const logout = () => {
    // dispatch(clearAdminTokenSlice());
    navigate("/admin");
  };

  return (
    <Tabs value="dashboard" orientation="vertical" className="w-screen h-full">
      <TabsHeader className="w-full min-h-screen pt-4">
        <div className="flex justify-center gap-2">
          <div className="w-36 h-16 ">
            <img
              className="border rounded-xl w-full h-full"
              src={POST_URL2}
              alt="logo"
            />
          </div>
          {/* <div className="flex items-center">
              <p className="text-4xl font-bold font-cursive text-black">
                ShopUp
              </p>
            </div> */}
        </div>
        <div className="pt-28">
          {data.map(({ label, value, icon }) => (
            <Tab
              key={value}
              value={value}
              className="max-h-10 lg:min-w-[16em]"
              style={{ display: "flex", justifyContent: "flex-start" }}
              onClick={() => handleTabClick(value)}
            >
              <div className="flex items-start gap-2 ">
                {React.createElement(icon, { className: "w-5 h-5" })}
                {label}
              </div>
            </Tab>
          ))}
        </div>
        <div
          className="flex gap-2 mt-1 cursor-pointer hover:bg-red-400 px-2 py-1 rounded-lg "
          onClick={logout}
        >
          <div>
            <ArrowLeftOnRectangleIcon className="h-6 w-6 text-gray-900" />
          </div>
          <div>
            <p>Logout</p>
          </div>
        </div>
      </TabsHeader>
      <TabsBody className="  ml-auto mr-auto ">
        {data.map(({ value, desc }) => (
          <TabPanel key={value} value={value}>
            {desc}
          </TabPanel>
        ))}
      </TabsBody>
    </Tabs>
  );
};

export default AdminDashboard;
