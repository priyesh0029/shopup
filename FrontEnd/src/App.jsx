import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "@material-tailwind/react";
import Home from "./pages/Home/Home";
import LoginForm from "./pages/Auths/login";
import SignUpForm from "./pages/Auths/signup";
import { useSelector } from "react-redux";
import { useJsApiLoader } from "@react-google-maps/api";
import ShopHome from "./pages/ShopOwner/ShopHome";
import AdminHome from "./pages/Admin/AdminHome";
import ShopOwnerProductPage from "./pages/ShopOwner/ShopOwnerProductPage";

const libraries = ["places", "maps", "geometry"];

const App = () => {
  const token = useSelector((store) => store.token.token);
  const shopToken = useSelector((store) => store.shopToken.token);
  const adminToken = useSelector((store) => store.adminToken.token);
  console.log("user token", token);
  console.log("shop token", shopToken);

  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyAUvxpccyeJPcbvNuo5r-C6Pyi_ewcqKkQ",
    libraries,
    language: "en",
    region: "IN",
  });
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          {/* AuthRoutes */}
          <Route path="/" element={token ? <Home /> : <LoginForm />} />
          <Route
            path="/signup"
            element={<SignUpForm isLoaded={isLoaded} loadError={loadError} />}
          />
          <Route path="/login" element={<LoginForm />} />
          {/* customerRoutes */}
          <Route path="/home" element={token ? <Home /> : <LoginForm />} />
          <Route
            path="/customerproductpage/:category?/:catId"
            element={token ? <ShopOwnerProductPage /> : <LoginForm />}
          />

          {/* shopOwnerRoutes */}
          <Route
            path="/shopdashboard"
            element={shopToken ? <ShopHome /> : <LoginForm />}
          />
          <Route
            path="/shopownerproductpage/:category?/:catId"
            element={shopToken ? <ShopOwnerProductPage /> : <LoginForm />}
          />

          {/* adminRoutes */}
          <Route
            path="/admindashboard"
            element={adminToken ? <AdminHome /> : <LoginForm />}
          />
        </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default App;
