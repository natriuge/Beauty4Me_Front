import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import "../pages/ranking/rankingStyle.css";

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
              <div className="card h-100 d-flex">
                <div className="prod-card-container">
                  <img
                    src={imageDetails}
                    className="card-img-top prod-img-ranking p-3"
                    alt={productName}
                  />
                  <div className="card-middle-ranking">
                    <Button
                      className="mb-5 mt-1"
                      variant="outline-secondary"
                      size="sm"
                      border="none"
                      onClick={() => navigate(`/product-detail/${_id}`)}
                    >
                      <i className="bi bi-search"></i>
                    </Button>
                  </div>
                </div>
                <div className="card-body flex-grow-1">
                  <h6 className="card-title h6-name-ranking">{productName}</h6>
                  <p className="p-brand-name">{brandName}</p>
                </div>
                <div className="d-flex">
                  <div className="p-ranting">
                    {rating}
                    <ReactStars
                      count={5}
                      value={rating}
                      size={24}
                      activeColor="(179, 237, 255)"
                      isHalf={true}
                      edit={false}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Card;
