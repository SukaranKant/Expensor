import "./App.css";
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { loginUser } from "./store/authSlice";
import CheckAuth from './utils/CheckAuth'

function App() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const token = Cookies.get("auth-token");

  const getUserDetails = async () => {
      if(!token) { 
        navigate('/login');
        return ;
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/auth/getuser`,
        {
          method: "GET",
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.ok) {
        const responseData = await response.json();
        dispatch(loginUser({ user: responseData.user }));
      }
      else {
        navigate('/login');
      }
    }
  
  useEffect(() => {
    try {
      getUserDetails();
    } catch (error) {
      console.log(error);
      navigate('/login');
    }
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<CheckAuth><Home /></CheckAuth>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default App;
