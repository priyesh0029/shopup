import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { ThemeProvider } from "@material-tailwind/react";
import Home from "./pages/Home/Home";
import LoginForm from "./pages/Auths/login";
import SignUpForm from "./pages/Auths/signup";
import { useSelector } from "react-redux";


const App = () => {
  const token = useSelector(
    (store) => store.token.token
  );
  console.log("user token",token);
  return (
    <Router>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={token ? <Home /> : <LoginForm />} />

          <Route path="/signup" element={<SignUpForm />} />

          <Route path="/home" element={token ? <Home /> : <LoginForm />} />
        </Routes>
      </ThemeProvider>
    </Router>
  );
};

export default App;
