import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "../pages/home/Home";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import Navbar from "../components/navbar/Navbar";
// import ProtectedRoute from "../pages/auth/ProtectedRoute";
import Ranking from "../pages/ranking/Ranking";
import NotFound from "../pages/not-found/NotFound";

import { AuthContextComponent } from "../contexts/authContext";
import ProductDetails from "../pages/ProductDetails";

function App() {
  return (
    <AuthContextComponent>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/" element={<ProtectedRoute component={<Home/>} />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/product-detail" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthContextComponent>
  );
}

export default App;
