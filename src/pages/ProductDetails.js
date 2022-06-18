import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import Ratings from "../components/ranking-rating/FixedRatingStars";
import api from "../apis/api";
import ReviewForm from "../components/ReviewForm";
import HTMLReactParser from "html-react-parser";

import "../assets/styles/productDetails.css";
import "../components/ranking-rating/FixedRatingStars";

function ProductDetails() {
  const [productsList, setProductsList] = useState([]);
  const [activeTab, setActiveTab] = useState("tab1");
  const { id } = useParams();

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
      const response = await api.get("/products");
      console.log(response.data);
      setProductsList([...response.data]);
    } catch (err) {
      console.error(err.response);
    }
  }

  console.log(productsList);

  return (
    <>
      {productsList.map((currentProduct) => {
        const {
          _id,
          productName,
          brandName,
          shortDescription,
          howToUse,
          ingredients,
          imageDetails,
          sephoraReviews,
        } = currentProduct;
        return (
          <div key={_id}>
            <div>
              <div>
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
              </div>

              <img src={imageDetails} alt={productName} className="ml-5" />
            </div>
            <div className="Tabs">
              <ul className="nav">
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
                  ? HTMLReactParser(shortDescription)
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
            <div className="review-form mt-0">
              <ReviewForm />
            </div>
          </div>
        );
      })}
    </>
  );
}
export default ProductDetails;
