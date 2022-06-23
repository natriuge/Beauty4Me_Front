import React, { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../apis/api";
import "bootstrap/dist/css/bootstrap.min.css";
import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";
import Pagination from "../../components/pagination/Pagination";
import PaginationSelector from "../../components/pagination/PaginationSelector";
import ReactStars from "react-rating-stars-component";
import { AuthContext } from "../../contexts/authContext";

import "../favorites/favorites.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Favorites() {
  const [userFavorites, setuserFavorites] = useState([]);
  // const [productsFavoritesByUser, setproductsFavoritesByUser] = useState([]);
  const [userFavoriteProducts, setUserFavoriteProducts] = useState([]);
  const { loggedInUser } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [productsPerPage, setProductsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(0);

  console.log();

  useEffect(() => {
    async function fetchUserFavorites() {
      try {
        setLoading(true);
        const response = await api.get(`/profile/${loggedInUser.user._id}`);

        console.log("resposta do response", response.data);
        setuserFavorites([...response.data.favoriteProducts]);

        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    fetchUserFavorites();
  }, [loggedInUser.user._id]);

  const navigate = useNavigate();

  //math.ceil  -> arredonda o número para cima. ex: 11.1 vira 12
  const pages = Math.ceil(userFavorites.length / productsPerPage);

  //fatiar nosso array de produtos
  const startIndex = currentPage * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = userFavorites.slice(startIndex, endIndex);

  console.log("favoritos atualizado", userFavorites);
  // console.log("userReviews", userReviews);

  // const idSpecificProduct = userReviews.map((review) => {
  //   return review.productId;
  // });

  // const id = idSpecificProduct.map((prod) => {
  //   return prod;
  // });

  // console.log("id", id);

  // useEffect(() => {
  //   async function fetchproductsReviewedByUser() {
  //     try {
  //       const response = await api.get(`/product/${idSpecificProduct}`);

  //       // console.log("PRODUTOS", response.data);

  //       setproductsReviewsByUser([...response.data]);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   }
  //   fetchproductsReviewedByUser();
  // }, [idSpecificProduct]);

  // console.log("productsReviewsByUser", productsReviewsByUser);

  // function ReviewClick(event) {
  //   event.preventDefault();
  //   console.log("The link was clicked.");
  // }

  return (
    <div className="col-6 align-items-center m-5">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="mb-5">
            <h1 className="h1-title">Ranking Page</h1>
            <h4 className="h4-title">Check out your favorite products</h4>
          </div>
          <PaginationSelector
            productsPerPage={productsPerPage}
            setProductsPerPage={setProductsPerPage}
          />
          <div
            className="col cols-1 cols-md-5 g-4 mb-5"
            style={{ gap: "2rem 0rem" }}
          >
            {userFavorites.map((element) => {
              const { _id, productName, brandName, rating, imageDetails } =
                element;
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
                          onClick={() => navigate(`/product-detail/${_id}`)}
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
                    <div className="d-flex">
                      <div className="p-ranting">
                        {rating}
                        <ReactStars
                          count={5}
                          value={rating}
                          size={24}
                          activeColor="#ffd700"
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
          <div className="row justify-content-center">
            <Pagination
              pages={pages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </>
      )}
    </div>
  );
}
export default Favorites;
