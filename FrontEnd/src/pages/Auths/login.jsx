import { useFormik } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";

import {
  CardBody,
  CardFooter,
  Typography,
  Input,
  Button,
  Option,
  Select,
} from "@material-tailwind/react";
import { useState } from "react";
import { adminLogin, login, shopLogin } from "../../api/Auth/auth";
import { setToken } from "../../Features/redux/slices/user/tokenSlice";
import { SetUserInfo } from "../../Features/redux/slices/user/homeSlice";
import { POST_URL2, REALM_LOGO } from "../../constants/mainUrls";
import { setShopToken } from "../../Features/redux/slices/shopOwner/shopOwnerToken";
import { setAdminToken } from "../../Features/redux/slices/admin/adminTokenSlice";
import { SetShopInfo } from "../../Features/redux/slices/shopOwner/shopInfoSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const [role, setrole] = useState("");

  const submitHandler = async (userData) => {
    console.log("data of user login = ", userData);
    if (role === "customer") {
      let response = await login(userData);
      console.log("data of user login = ", response);
      if (response.status) {
        const token = response.userInfo.token;
        const user = response.userInfo.user;
        console.log(token);
        dispatch(setToken(token));
        dispatch(SetUserInfo(user));
        navigate("/");
      } else {
        console.log("signUp failed");
      }
    } else if (role === "shopOwner") {
      let response = await shopLogin(userData);
      console.log("data of user login = ", response);
      if (response.status) {
        const token = response.userInfo.token;
        const user = response.userInfo.user;
        console.log(token);
        dispatch(setShopToken(token));
        dispatch(SetShopInfo(user));    //should do later while creating shoupownwr ui
        navigate("/shopdashboard");
      } else {
        console.log("signUp failed");
      }
    } else if (role === "admin") {
      let response = await adminLogin(userData);
      console.log("data of user login = ", response);
      if (response.status) {
        const token = response.userInfo.token;
        const user = response.userInfo.user;
        console.log(token);
        dispatch(setAdminToken(token));
        // dispatch(SetUserInfo(user));    //should do later while creating Admin ui
        navigate("/admindashboard");
      } else {
        console.log("signUp failed");
      }
    }
  };

  const formik = useFormik({
    initialValues: {
      role: "",
      loginCredential: "",
      password: "",
    },
    validationSchema: Yup.object({
      role: Yup.string().required("*Role is required"),

      loginCredential: Yup.string()
        .max(20, "Must be less than 20 characters")
        .required("Required"),
      password: Yup.string()
        // .max(20, "Must be less than 20 characters")
        // .min(8, "Must be 8 characters or more")
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      submitHandler(values);
      setSubmitting(false);
    },
  });

  return (
    <div className="flex justify-center w-full h-full mb-5">
      <div className="flex w-100 mt-16 pt-12 items-center justify-center flex-col border-2 border-gray-400 rounded-xl">
        <div>
          <div className="flex justify-center gap-2">
            <div className="w-36 h-16 ">
              <img className="border rounded-xl w-full h-full" src={POST_URL2} alt="logo" />
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
          <form onSubmit={formik.handleSubmit} className=" ">
            <Typography variant="h3" color="blue" className="text-center ">
              Login
            </Typography>

            <CardBody className="flex flex-col gap-1">
              <Select
                label="Select your role"
                id="role"
                // {...formik.getFieldProps("role")}
                value={role ? role : formik.values.role}
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
                <Option value="admin">Admin</Option>
              </Select>
              <p className="h-4 ml-2 text-xs text-red-800">
                {formik.touched.role && formik.errors.role
                  ? formik.errors.role
                  : null}
              </p>
              <Input
                type="text"
                label="User Name"
                size="lg"
                id="loginCredential"
                {...formik.getFieldProps("loginCredential")}
              />
              <p className="h-4 ml-2 text-sm text-red-800">
                {formik.touched.loginCredential && formik.errors.loginCredential
                  ? formik.errors.loginCredential
                  : null}
              </p>

              <Input
                type="password"
                label="Password"
                size="lg"
                id="password"
                {...formik.getFieldProps("password")}
              />
              <p className="h-4 ml-2 text-sm text-red-800">
                {formik.touched.password && formik.errors.password
                  ? formik.errors.password
                  : null}
              </p>
            </CardBody>
            <CardFooter className="pt-0">
              <Button type="submit" color="blue" variant="gradient" fullWidth>
                Sign In
              </Button>
            </CardFooter>
            <Typography
              color="gray"
              className="m-6 text-center font-normal lg:w-64"
            >
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-500 transition-colors hover:text-blue-700"
              >
                Sign up
              </Link>
            </Typography>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
