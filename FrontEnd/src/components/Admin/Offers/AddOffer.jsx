import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
} from "@material-tailwind/react";
import { getAllCategories } from "../../../api/Admin/adminCategoty";
import { Autocomplete } from "@react-google-maps/api";
import { locationDetailsGenerator } from "../../../constants/locationGenerator";

const AddOffer = ({ handleOpen, open }) => {
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
      <Dialog open={open} handler={handleOpen}>
        <DialogHeader>Add Offer</DialogHeader>
        <DialogBody>
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
                  className="pac-container"
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
                      style={{
                        zIndex: 1000, // Ensuring the input field has a high z-index
                        position: "relative",
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
        </DialogBody>
      </Dialog>
    </>
  );
};

export default AddOffer;
