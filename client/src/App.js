import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from "react-router-dom";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Login from "./components/Login";
import RegisterTrip from "./components/RegisterTrip";
import Home from "./components/Home";
import { Navigate } from "react-router-dom";
import RegisterUser from "./components/RegisterUser";
import './App.css';
import Trips from "./components/Trips";

function App() {
  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/registerUser" element={<RegisterUser />} />
      <Route path="/registerTrip" element={<RegisterTrip />} />
      <Route path="/trips" element={<Trips />} />
      <Route path="/home" element={<Home />} />

      <Route index element={<Navigate to="/login" />} />
    </Routes>
    </BrowserRouter>
    <ToastContainer />

    </>
    
  );
}

export default App;
