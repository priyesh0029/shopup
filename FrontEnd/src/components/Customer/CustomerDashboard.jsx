import { Input } from "@material-tailwind/react";
import React, { useState } from "react";
import CategoryPage from "../Product/CategoryPage";
import axios from "axios";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { saveUserLocation } from "../../api/Customer/customerCategory";

const key = process.env.GOOGLE_API_KEY

const CustomerDashboard = () => {
  const [location, setLocation] = useState({});
  const [error, setError] = useState(null);
  const [address, setAddress] = useState("")

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("position.coords : ", position.coords);
          const { latitude, longitude } = position.coords;
          console.log("rds.position.coords.lat : ", latitude, longitude );
          if (latitude && longitude) {
            setLocation(()=>{ latitude, longitude });
            saveLocation({ latitude, longitude })
            fetchAddress(latitude, longitude);
          } else {
            setError("Unable to retrieve latitude and longitude.");
            toast.error("Unable to retrieve latitude and longitude.");
          }
        },
        (err) => {
          setError(err.message);
          toast.error(err.message)
        },
        {
          enableHighAccuracy: true, // Request high accuracy
          timeout: 5000,
          maximumAge: 0,
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      toast.error("Geolocation is not supported by this browser.")
    }
  }, []);

  const saveLocation = async(locationCoord)=>{
    const response = await saveUserLocation(locationCoord)
    if(response.success){
      // toast.success(response.message)
    }else{
      toast.error(response.message);
    }
  }

  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCx9albDirot3IabDjW03Nox1BYy0e-KZY`
      );
      const data = response.data;
      console.log("dta.results of address : ",response);
      if (data.results && data.results.length > 0) {
        setAddress(data.results[0].formatted_address);
      } else {
        setError("No address found for these coordinates.");
        toast.error("No address found for these coordinates.");
      }
    } catch (error) {
      setError("Error fetching the address.");
      toast.error("Error fetching the address.");
    }
  };

  return (
    <div className="w-screen min-h-screen flex flex-col justify-center items-center gap-4">
      <ToastContainer position="bottom-left" />
      <div
        className="w-full h-full flex justify-center items-center flex-col gap-3 bg-cover bg-center"
        style={{
          backgroundImage: `url('https://as1.ftcdn.net/v2/jpg/02/24/64/56/1000_F_224645618_dtpq1bEjnN67g3gampm39hg698AUC9tf.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100vh", // Ensures the div takes full viewport height
          width: "100vw", // Ensures the div takes full viewport width
        }}
      >
       { address.length > 0 && (<div>
          <p>You are at location : {address}</p>
        </div>)}
        <div className="flex flex-col gap-3 justify-center items-center mt-10">
          <p className="font-bold text-4xl text-black">FIND WHAT YOU NEED</p>
          <div className="flex justify-center items-center">
            <p className="font-thin text-sm text-black">
              Search for Restaurants, Hotels, Cafes and more..
            </p>
          </div>
        </div>
        <div className="w-full px-[20%] text-black ">
          <Input
            type="text"
            id="search"
            label="Search"
            placeholder="Search here..."
            className="text-black "
            success
          />
        </div>
      </div>

      <div className="w-full h-full">
        <CategoryPage role={"customer"} />
      </div>
    </div>
  );
};

export default CustomerDashboard;
