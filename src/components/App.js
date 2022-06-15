import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "../pages/Home";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
// import ProtectedRoute from "../pages/auth/ProtectedRoute";

import { AuthContextComponent } from "../contexts/authContext";
import ProductDetails from "./ProductDetails";

function App() {
  return (
    <AuthContextComponent>
      <Routes>
       <Route path="/" element={<Home/>}/>
        {/* <Route path="/" element={<ProtectedRoute component={<Home/>} />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product-detail" element={<ProductDetails />} />
      </Routes>
    </AuthContextComponent>
  );
}

export default App;
