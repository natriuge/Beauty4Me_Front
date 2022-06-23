import React, { useContext, useState, useEffect } from "react";
import api from "../../apis/api";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../../contexts/authContext";

function MyReviews() {
  const [userReviews, setuserReviews] = useState([]);
  const [productsReviewsByUser, setproductsReviewsByUser] = useState([]);
  const { loggedInUser } = useContext(AuthContext);

  useEffect(() => {
    async function fetchUserReviews() {
      try {
        const response = await api.get(`/profile/${loggedInUser.user._id}`);
        console.log("DATA", response.data);
        setuserReviews({ ...response.data });
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserReviews();
  }, []);

  const eachReview = userReviews.allUserReviews;

  console.log("MEU STATE", userReviews);
  console.log("eachReview", eachReview);

  // useEffect(() => {
  //   async function fetchUserReviewsProducts() {
  //     try {
  //       const response = await api.get("review-product");
  //       console.log("DATA", response.data);
  //       setproductsReviewsByUser({ ...response.data });
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  //   fetchUserReviewsProducts();
  // }, []);
  console.log("productsReviewsByUser", productsReviewsByUser);
  return (
    <div className="col-6 align-items-center m-5">
      <h3>My Reviews</h3>
      {eachReview.map((oneReview) => {
        const { authorRating, comment, productId } = oneReview;
        return (
          <div>
            <ul>
              <li>
                <h5>Nome produto:{oneReview.productName}</h5>
              </li>
              <li>
                {" "}
                <h6>Rating:{authorRating}</h6>
              </li>
              <li>
                <h6>Comentário:{comment}</h6>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}
export default MyReviews;
