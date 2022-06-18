import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import Ratings from "../../components/FixedRatingStars";
import api from "../../apis/api";
import ReviewForm from "../../components/Review/ReviewForm";
import HTMLReactParser from "html-react-parser";
import { AuthContext } from "../../contexts/authContext";

import "../ProductDetail/productDetails.css"
import "../../assets/styles/rankingStyle.css";
  

function ProductDetails() {
  const [productsList, setProductsList] = useState([]);
  const [activeTab, setActiveTab] = useState("tab1");
  const [newReview, setNewReview] = useState({
    authorId: null,
    comment: "",
    authorRating: 0,
    productId: null
  })
  const [errors, setErrors] = useState({
    authorId: null,
    comment: null,
    authorRating: null,
    productId: null,
  });


  
  const navigate = useNavigate();

  const { id } = useParams();
  
  const { loggedInUser } = useContext(AuthContext);

  const handleTab1 = () => {
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    setActiveTab("tab2");
  };
  const handleTab3 = () => {
    setActiveTab("tab3");
  };

  useEffect(() => {
    getProductsList();
  }, []);

  async function getProductsList() {
    try {
      const response = await api.get(`/products/${id}`);
      console.log(response.data);
      setProductsList([...response.data]);
    } catch (err) {
      console.error(err.response);
    }
  }
  // console.log(productsList);

  async function handleSubmit(event) {
    event.preventDefault();

    try{
      const response = await api.post("/review", newReview);
       console.log("linha 2");
      setErrors({ authorId: "", comment: "", authorRating: 0, productId: "" });
      console.log("linha 3")
      // navigate("/")
      console.log(response.data)
    } catch(err){
      console.error(err.response);
      return setErrors({...err.response.data.errors})
    }
    console.log(errors)
  }

  function handleChange(event){
    setNewReview({ ...newReview, productId: id [event.target.name]: event.target.value });
  }
  //  function isAuthor() {
  //    return newReview.authorId._id === loggedInUser.user._id;
  //  }

 
  return (
    <>
      {productsList.map((currentProduct) => {
        const {
          _id,
          productName,
          brandName,
          shortDescription,
          longDescription,
          howToUse,
          ingredients,
          imageDetails,
          sephoraReviews,
          averagePrice,
          rating
        } = currentProduct;
        return (
          <div key={_id}>
            <div className="product-container">
              <div>
                <img
                  src={imageDetails}
                  alt={productName}
                  className="product-image"
                />
              </div>
              <div className="align-text">
                <p
                  style={{
                    fontSize: "1.5rem",
                    textTransform: "uppercase",
                    fontWeight: "bold",
                  }}
                  className="ml-5 mt-5 mb-0"
                >
                  {brandName}
                </p>
                <p
                  style={{ fontSize: "1rem", textTransform: "uppercase" }}
                  className="ml-5"
                >
                  {productName}
                </p>
                <div className="ml-5 mt-5">
                  <h5>
                    <strong>RATING</strong>
                  </h5>
                  <Ratings>{rating}</Ratings>
                </div>
                <h5 className="ml-5 mt-5">
                  <strong>AVERAGE PRICE</strong>
                </h5>
                <h5 className="ml-5">{averagePrice}</h5>
              </div>
            </div>
            <div className="Tabs">
              <ul className="nav mb-2 mt-3">
                <li
                  className={activeTab === "tab1" ? "active" : ""}
                  onClick={handleTab1}
                >
                  <h5>DESCRIPTION</h5>
                </li>
                <li
                  className={activeTab === "tab2" ? "active" : ""}
                  onClick={handleTab2}
                >
                  <h5>HOW TO USE</h5>
                </li>
                <li
                  className={activeTab === "tab3" ? "active" : ""}
                  onClick={handleTab3}
                >
                  <h5>INGREDIENTS</h5>
                </li>
              </ul>
              <div className="outlet">
                {activeTab === "tab1"
                  ? HTMLReactParser(longDescription)
                  : activeTab === "tab2"
                  ? HTMLReactParser(howToUse)
                  : HTMLReactParser(ingredients)}
              </div>
              <hr className="featurette-divider mb-3 mt-5" />
              <div className="mb-5">
                <h5>
                  <strong className="text-background">PRODUCT REVIEWS</strong>
                </h5>
              </div>
              {sephoraReviews.map((review) => {
                return (
                  <div key={review.ProductId}>
                    <div>
                      <Ratings>{review.Rating}</Ratings>
                      <strong className="mb-5">{review.UserNickname}</strong>
                      <br />
                    </div>
                    <em>{review.ReviewText}</em>
                    <hr className="featurette-divider" />
                  </div>
                );
              })}
            </div>
            {/* só aparece se o user não estiver logado */}
            <div className="align-items">
              To create a review you need to be
              <Link className="nav-link active text-dark pl-1" to="/login">
                <strong>logged!</strong>
              </Link>
            </div>
            {/* {isAuthor() && ( */}
              <div className="review-form mt-0">
                <ReviewForm
                  type="form"
                  id="newReview"
                  value={newReview.comment}
                  name="comment"
                  onChange={handleChange}
                  // onClick={handleSubmit}
                />
                <button
                  type="submit"
                  className="btn btn-outline-secondary mt-2"
                  onClick={handleSubmit}
                >
                  <strong>send</strong>
                </button>
              </div>
            {/* )} */}
          </div>
        );
      })}
    </>
  );
}
export default ProductDetails;
