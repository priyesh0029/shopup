import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch } from "react-redux";
import {
  Input,
  Button,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import loadash from "lodash";
import "react-toastify/dist/ReactToastify.css";
import { register, shopRegister } from "../../api/Auth/auth";
import { setToken } from "../../Features/redux/slices/user/tokenSlice";
import { SetUserInfo } from "../../Features/redux/slices/user/homeSlice";
import { POST_URL2, REALM_LOGO } from "../../constants/mainUrls";
import { Autocomplete } from "@react-google-maps/api";
import { locationDetailsGenerator } from "../../constants/locationGenerator";
import { setShopToken } from "../../Features/redux/slices/shopOwner/shopOwnerToken";
import { SetShopInfo } from "../../Features/redux/slices/shopOwner/shopInfoSlice";
// import { POST_URL } from "../../../constants/constants";

const SignUpForm = ({ isLoaded, loadError }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [role, setrole] = useState("");
  const [locationName, setlocationName] = useState("");
  const [locationCoord, setlocationCoord] = useState("");

  const submitHandler = async (userData) => {
    console.log("userdata : ", userData);
    if (role === "shopOwner") {
      let response = await shopRegister(userData);
      if (response.status) {
        console.log("data of shop owner response = ", response);
        const token = response.userInfo.token;
        const user = response.userInfo.user;
        console.log(token);
        dispatch(setShopToken(token));
        dispatch(SetShopInfo(user));    //should do later while creating shoupownwr ui
        navigate("/shopdashboard");
      } else {
        console.log("signUp failed");
      }
    } else {
      let response = await register(userData);
      if (response.status) {
        console.log("data of user response = ", response);
        const token = response.userInfo.token;
        const user = response.userInfo.user;
        console.log(token);
        dispatch(setToken(token));
        dispatch(SetUserInfo(user));
        navigate("/");
      } else {
        console.log("signUp failed");
      }
    }
  };

  const mobileNumberHandle = (e) => {
    const mobileValue = e.target.value.replace(/[^0-9]/g, "").slice(0, 10);
    formik.setFieldValue("number", mobileValue);
  };

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

  const formik = useFormik({
    initialValues: {
      name: "",
      username: "",
      number: "",
      email: "",
      role: "",
      address: "",
      location: locationName,
      password: "",
      rePassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .max(20, "*Must be less than 20 characters")
        .required("*Required"),
      username: Yup.string()
        .max(20, "*Must be less than 20 characters")
        .required("*Required"),
      email: Yup.string().email("*Invalid email address").required("*Required"),
      // role: Yup.string().required("*Role is required"),
      ...(role === "shopOwner" && {
        address: Yup.string().required("*Address is required"),
        location: Yup.string().required("*Location is required"),
      }),
      password: Yup.string()
        .min(1, "*Must be 8 characters or more")
        .required("*Required"),
      rePassword: Yup.string()
        .oneOf([Yup.ref("password"), ""], "*Password not match")
        .required("*Required"),
      number: Yup.string()
        .matches(
          /^[0-9]{10}$/,
          "*Mobile number must be a 10-digit numeric value"
        )
        .required("*Required"),
      // agreeTerms: Yup.boolean()
      //   .oneOf([true], "You must agree to the terms and conditions")
    }),
    onSubmit: async (values, { setSubmitting }) => {
      const data = loadash.omit(values, "rePassword");
      if (role === "shopOwner") {
        data.location = locationCoord;
        console.log("data = ", data);
      }
      submitHandler(data);
      setSubmitting(false);
    },
  });

  return (
    <div className="flex justify-center w-full h-full mb-5">
      <div className="flex w-fit h-fit mt-16 pt-8 items-center justify-center flex-col border-2 border-gray-400 rounded-xl">
        <div>
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
          <ToastContainer position="bottom-left" />
        </div>
        <div className="flex justify-center pt-8">
          <ToastContainer position="bottom-left" />
          <form
            onSubmit={formik.handleSubmit}
            className=" ml-auto mr-auto 2 w-100 "
          >
            <Typography variant="h3" color="blue" className="text-center ">
              Sign Up
            </Typography>

            <div className="p-4">
              <div className="flex flex-col gap-1">
                <div className="flex gap-1">
                  <div>
                    <Input
                      type="text"
                      id="name"
                      label="Name"
                      {...formik.getFieldProps("name")}
                    />
                    <p className="h-6 ml-2 text-xs text-red-800">
                      {formik.touched.name && formik.errors.name
                        ? formik.errors.name
                        : null}
                    </p>
                  </div>

                  <div className="w-100">
                    <Input
                      type="text"
                      id="username"
                      label="Username"
                      {...formik.getFieldProps("username")}
                    />
                    <p className="h-4 ml-2 text-xs text-red-800">
                      {formik.touched.username && formik.errors.username
                        ? formik.errors.username
                        : null}
                    </p>
                  </div>
                </div>

                <Input
                  type="text"
                  id="number"
                  label="Phone Number"
                  value={formik.values.number}
                  onChange={mobileNumberHandle}
                  // {...formik.getFieldProps('mobile')}
                />
                <p className="h-4 ml-2 text-xs text-red-800">
                  {formik.touched.number && formik.errors.number
                    ? formik.errors.number
                    : null}
                </p>

                <Input
                  type="email"
                  id="email"
                  label="E-mail"
                  {...formik.getFieldProps("email")}
                />
                <p className="h-4 ml-2 text-xs text-red-800">
                  {formik.touched.email && formik.errors.email
                    ? formik.errors.email
                    : null}
                </p>

                <Select
                  label="Select your role"
                  id="role"
                  // {...formik.getFieldProps("role")}
                  value={formik.values.role}
                  onChange={(val) => {
                    console.log("rolevalue: ", val);
                    formik.setFieldValue("role", val);
                    formik.setFieldTouched("role", true);
                    setrole(val);
                  }}
                >
                  <Option value="">Select...</Option>
                  <Option value="customer">Customer</Option>
                  <Option value="shopOwner">Shop Owner</Option>
                </Select>
                <p className="h-4 ml-2 text-xs text-red-800">
                  {formik.touched.role && formik.errors.role ? null : null}
                </p>
                {role.length !== 0 && (
                  <div>
                    {role && role === "shopOwner" && (
                      <div>
                        <Input
                          type="text"
                          id="address"
                          label="Address"
                          {...formik.getFieldProps("address")}
                        />
                        <p className="h-6 ml-2 text-xs text-red-800">
                          {role &&
                          role === "shopOwner" &&
                          formik.touched.address &&
                          formik.errors.address
                            ? formik.errors.address
                            : null}
                        </p>
                        {!isLoaded ? (
                          <div>Loading...</div>
                        ) : (
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
                                  value={
                                    locationName
                                      ? locationName
                                      : formik.values.location
                                  }
                                  onChange={(e) => {
                                    formik.setFieldValue(
                                      "location",
                                      e.target.value
                                    );
                                  }}
                                  onKeyDown={(e) =>
                                    e.key === "Backspace" &&
                                    setlocationName("") &&
                                    setlocationCoord("")
                                  }
                                  onBlur={formik.handleBlur("location")}
                                />
                                <p className="h-6 ml-2 text-xs text-red-800">
                                  {role &&
                                  role === "shopOwner" &&
                                  formik.touched.location &&
                                  formik.errors.location
                                    ? formik.errors.location
                                    : null}
                                </p>
                              </>
                            </Autocomplete>
                          </div>
                        )}
                      </div>
                    )}
                    <Input
                      type="password"
                      id="password"
                      label="Password"
                      {...formik.getFieldProps("password")}
                    />
                    <p className="h-4 ml-2 text-xs text-red-800">
                      {formik.touched.password && formik.errors.password
                        ? formik.errors.password
                        : null}
                    </p>
                    <Input
                      type="password"
                      id="rePassword"
                      label="Re-type Password"
                      {...formik.getFieldProps("rePassword")}
                    />
                    <p className="h-4 ml-2 text-xs text-red-800">
                      {formik.touched.rePassword && formik.errors.rePassword
                        ? formik.errors.rePassword
                        : null}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex w-24 ml-44">
                <Button
                  type="submit"
                  className="mt-2"
                  color="blue"
                  variant="gradient"
                  fullWidth
                >
                  Submit
                </Button>
              </div>
              <Typography
                color="gray"
                className="mt-4 text-center font-normal lg:w-68"
              >
                Already have an account?{" "}
                <Link
                  to="/"
                  className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                >
                  Log in
                </Link>
              </Typography>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
