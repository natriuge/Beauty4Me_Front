import React, { useState, useEffect } from "react";
import api from "../../apis/api";
import "bootstrap/dist/css/bootstrap.min.css";

function MyReviews() {
  const [userReviews, setuserReviews] = useState([]);
  const [productsReviewsByUser, setproductsReviewsByUser] = useState([]);

  useEffect(() => {
    async function fetchUserReviews() {
      try {
        const response = await api.get("/review/:authorId");

        // console.log("DATA", response.data);

        setuserReviews([...response.data]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserReviews();
  }, []);

  // console.log("userReviews", userReviews);

  const idSpecificProduct = userReviews.map((review) => {
    return review.productId;
  });

  const id = idSpecificProduct.map((prod) => {
    return prod;
  });

  // console.log("id", id);

  useEffect(() => {
    async function fetchproductsReviewedByUser() {
      try {
        const response = await api.get(`/product/${idSpecificProduct}`);

        // console.log("PRODUTOS", response.data);

        setproductsReviewsByUser([...response.data]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchproductsReviewedByUser();
  }, [idSpecificProduct]);

  // console.log("productsReviewsByUser", productsReviewsByUser);

  // function ReviewClick(event) {
  //   event.preventDefault();
  //   console.log("The link was clicked.");
  // }

  return (
    <div className="col-6 align-items-center m-5">
      <h3>My Reviews</h3>
      {userReviews.map((eachReview) => {
        return (
          <div>
            <ul>
              <li>
                <h5>Nome produto:{eachReview.productId.productName}</h5>
              </li>
              <li>
                {" "}
                <h6>Rating:{eachReview.authorRating}</h6>
              </li>
              <li>
                <h6>Comentário:{eachReview.comment}</h6>
              </li>
            </ul>
          </div>
        );
      })}
    </div>
  );
}
export default MyReviews;
