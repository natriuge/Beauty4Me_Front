import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../contexts/authContext";
import api from "../../apis/api";

import ilustration from "../../assets/images/ilustration.jpg";
import hands from "../../assets/images/hands.jpg";
import "./profileStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Profile() {
  const { loggedInUser, loading, setLoggedInUser, handleLogout } =
    useContext(AuthContext);

  const [userReviews, setuserReviews] = useState([]);
  const [productsReviewsByUser, setproductsReviewsByUser] = useState([]);

  useEffect(() => {
    async function fetchUserReviews() {
      try {
        const response = await api.get("/review/:authorId");

        console.log("DATA", response.data);

        setuserReviews([...response.data]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserReviews();
  }, []);

  console.log("userReviews", userReviews);

  const idSpecificProduct = userReviews.map((review) => {
    return review.productId;
  });

  const id = idSpecificProduct.map((prod) => {
    return prod;
  });

  console.log("id", id);

  useEffect(() => {
    async function fetchproductsReviewedByUser() {
      try {
        const response = await api.get(`/product/${idSpecificProduct}`);

        console.log("PRODUTOS", response.data);

        setproductsReviewsByUser([...response.data]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchproductsReviewedByUser();
  }, [idSpecificProduct]);

  console.log("productsReviewsByUser", productsReviewsByUser);

  function ReviewClick(event) {
    event.preventDefault();
    console.log("The link was clicked.");
  }

  return (
    <div className="profile-page">
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
        <div className="col-6 align-items-center m-5">
          <h1>ONDE O TEXTO ESTÁ</h1>
          {/* <img src={ilustration} className="ilustration" alt="ilustration" /> */}
          <h3>My Reviews</h3>
          {userReviews.map((eachReview) => {
            return (
              <div>
                <h7>{eachReview.productId.productName}</h7>
                <h8>{eachReview.authorRating}</h8>
                <h8>{eachReview.comment}</h8>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Profile;
