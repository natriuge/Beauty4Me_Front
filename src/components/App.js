import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Home from "../pages/home/Home";
import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import Navbar from "../components/navbar/Navbar";
import ProtectedRoute from "../pages/auth/ProtectedRoute";
import Ranking from "../pages/ranking/Ranking";
import NotFound from "../pages/not-found/NotFound";
import Search from "../pages/search/Search";

import { AuthContextComponent } from "../contexts/authContext";
import ProductDetails from "../pages/ProductDetail/ProductDetails";
import Profile from "../pages/profile/Profile";
import Favorites from "../components/favorites/Favorites";
import MyReviews from "../components/my-reviews/MyReviews";

function App() {
  return (
    <AuthContextComponent>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search/:keyword" element={<Search />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route
          path="/profile/"
          element={<ProtectedRoute component={Profile} />}
        >
          <Route path="favorites" element={<Favorites />} />
          <Route path="my-reviews" element={<MyReviews />} />
          <Route path="*" element={<NotFound />} />
        </Route>
        <Route path="/product-detail/:id" element={<ProductDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthContextComponent>
  );
}

export default App;
