import { useNavigate } from "react-router-dom";
import Ratings from "../components/ranking-rating/FixedRatingStars";

function Card(props) {
  const products = props.product;
  const navigate = useNavigate();

  return (
    <div className="container">
      <div
        className="row row-cols-1 row-cols-md-5 g-4 mt-5 mb-5"
        style={{ gap: "2rem 1rem" }}
      >
        {products.map((element) => {
          const { _id, productName, brandName, rating, imageDetails } = element;
          return (
            <div key={_id} className="col">
              <div className="card h-100 d-flex border-card">
                <div className="prod-card-container">
                  <img
                    src={imageDetails}
                    className="card-img-top prod-img p-3"
                    alt={productName}
                  />
                  <div className="card-middle-ranking">
                    <button
                      onClick={() => navigate("ProductDetails")}
                      className="btn card-text-ranking"
                    >
                      <i className="bi bi-search"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body flex-grow-1">
                  <h6 className="card-title h6-name">{productName}</h6>
                  <p className="card-text p-brand-name">{brandName}</p>
                </div>
                <div className="d-flex justify-content-center">
                  <p className="card-text p-ranting pb-3">
                    {rating}
                    <Ratings>{rating}</Ratings>
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className=" row justify-content-center"></div>
    </div>
  );
}

export default Card;
