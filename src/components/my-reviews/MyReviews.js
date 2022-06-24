import React, { useContext, useState, useEffect } from "react";
import api from "../../apis/api";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthContext } from "../../contexts/authContext";

function MyReviews() {
  const [userReviews, setuserReviews] = useState({});
  const [productsReviewsByUser, setproductsReviewsByUser] = useState([{}]);
  const { loggedInUser } = useContext(AuthContext);
  const [listReviews, setListReviews] = useState([]);

  useEffect(() => {
    async function fetchUserReviews() {
      try {
        const response = await api.get(`/profile/${loggedInUser.user._id}`);
        console.log("DATA", response.data);
        setuserReviews({ ...response.data });
        setListReviews([...response.data.allUserReviews]); //set é async
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserReviews();
  }, []);

  console.log("userReviews", userReviews);
  console.log("listReviews", listReviews);

  useEffect(() => {
    listReviews.map((unaReview, index) => {
      console.log("productId", unaReview.productId);


      let { productId } = unaReview;

      async function getProductReviewedByUser(productId) {
        try {
          const response = await api.get(`/specific-product/${productId}`);
          console.log("DATA DOS PRODUTOS", index, response.data);
          // const clone = [...productsReviewsByUser];
          // clone.push(response.data);
          // setproductsReviewsByUser(clone);
        } catch (err) {
          console.error(err);
        }
      }
      getProductReviewedByUser(unaReview.productId);
      return unaReview;
    });
  }, [listReviews]);

  console.log("productsReviewsByUser", productsReviewsByUser);
  return (
    <div className="col-6 align-items-center m-5">
      <h3>My Reviews</h3>
      {/* {eachReview.map((oneReview) => {
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
      })} */}
    </div>
  );
}
export default MyReviews;
