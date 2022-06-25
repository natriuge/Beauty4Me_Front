import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../apis/api";
import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";
import ReactStars from "react-rating-stars-component";
import { AuthContext } from "../../contexts/authContext";
import { Button } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

import "../../pages/ranking/rankingStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Favorites() {
  const [userFavorites, setuserFavorites] = useState([]);
  const { loggedInUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUserFavorites() {
      try {
        setLoading(true);
        const response = await api.get(`/profile/${loggedInUser.user._id}`);
        setuserFavorites([...response.data.favoriteProducts]);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserFavorites();
  }, [loggedInUser.user._id]);

  const navigate = useNavigate();

  return (
    <div className="col-12 align-items-center">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="mb-5 justify-content-center text-center">
            <h3 className="mb-5">
              <strong className="text-background-h3-ranking">
                FAVORITE PRODUCTS
              </strong>
            </h3>
          </div>
          <div
            className="row  row-cols-2 row-cols-md-3 g-2 mb-5"
            style={{ gap: "1rem 0rem" }}
          >
            {userFavorites.map((element) => {
              const { _id, productName, brandName, rating, imageDetails } =
                element;
              return (
                <div key={_id} className="col">
                  <div className="card h-100 d-flex">
                    <div className="prod-card-container">
                      <img
                        src={imageDetails}
                        className="card-img-top prod-img p-3"
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
                          <BsSearch />
                        </Button>
                      </div>
                    </div>
                    <div className="card-body flex-grow-1">
                      <h6 className="card-title h6-name-ranking">
                        {productName}
                      </h6>
                      <p className="card-text p-brand-name">{brandName}</p>
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
        </>
      )}
    </div>
  );
}
export default Favorites;
