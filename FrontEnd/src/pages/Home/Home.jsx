import React from "react";
import NavbarComp from "../../components/Home/NavBar";
// import Feeds from "../../components/Home/Feeds";
import NavBarComp from "../../components/Home/NavBar";
import CustomerDashboard from "../../components/Customer/CustomerDashboard";


const Home = () => {

    return (
      <div className="">
         <NavBarComp/>
         <CustomerDashboard/>
         {/* <Feeds/> */}
      </div>
    );
  };
  
  export default Home;
  
