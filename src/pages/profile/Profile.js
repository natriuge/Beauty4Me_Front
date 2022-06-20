import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import api from "../../apis/api";

import hands from "../../assets/images/hands.jpg";
import ilustration from "../../assets/images/ilustration.jpg";
import "./profileStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Profile() {
  const { loggedInUser, loading, setLoggedInUser, handleLogout } =
    useContext(AuthContext);

  const [userReviews, setuserReviews] = useState([]);

  useEffect(() => {
    async function fetchUserReviews() {
      try {
        const response = await api.get("/review");

        console.log(response.data);

        setuserReviews([...response.data]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserReviews();
  }, [userReviews]);

  console.log(loggedInUser);

  return (
    <div className="container mt-5">
      <div className="row d-flex flex-nowrap">
        <div className="col-4 align-items-start me-5">
          <img src={hands} className="card-img mt-5" alt="hands ilustration" />
          <div className="mt-5 ">
            <h6 className="mb-3">Welcome Back, {loggedInUser.user.name}</h6>
            <h6 className="mb-3">
              Your skin type is {loggedInUser.user.userSkinType}
            </h6>
            <ul>
              <li>
                <button className="btn btn-link">Favorite Products</button>
              </li>
              <li>
                {" "}
                <button className="btn btn-link">My Reviews</button>
              </li>
              <li>
                <button className="btn btn-link" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>

        {}
        <div className="col-6 align-items-center m-5">
          <img src={ilustration} className="ilustration" alt="ilustration" />
        </div>
      </div>
    </div>
  );
}

export default Profile;
