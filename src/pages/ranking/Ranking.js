import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
<<<<<<< HEAD:src/pages/Ranking.js
import api from "../apis/api";
import Ratings from "../components/FixedRatingStars";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import Pagination from "../components/Pagination";
import PaginationSelector from "../components/PaginationSelector";
import Card from "../components/Card"
=======
import api from "../../apis/api";
import Ratings from "../../components/ranking-rating/FixedRatingStars";
import Navbar from "../../components/Navbar";
import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";
import Pagination from "../../components/pagination/Pagination";
import PaginationSelector from "../../components/pagination/PaginationSelector";
>>>>>>> afe3ecef79339123507289d3bba7058514ae5cb7:src/pages/ranking/Ranking.js

import "../ranking/rankingStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Ranking() {
  const [state, setState] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [productsPerPage, setProductsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(0);

  //math.ceil  -> arredonda o número para cima. ex: 11.1 vira 12
  const pages = Math.ceil(state.length / productsPerPage);

  //fatiar nosso array de produtos
  const startIndex = currentPage * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = state.slice(startIndex, endIndex);

  const navigate = useNavigate();

  //fazer o meu request de produtos no BD
  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await api.get("/products");
        setState([...response.data]);
        setLoading(false);
      } catch (err) {
        setErrorMessage("Unable to get products list");
        setLoading(false);
      }
    }
    fetchProducts();
  }, [errorMessage]); //PRECISO INSERIR O SETERRORMESSAGE AQUI????

  useEffect(() => {
    setCurrentPage(0);
  }, [productsPerPage]);

  return (
    <div className="container mt-5">
      <Navbar />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="mb-5">
            <h1 className="h1-title">Ranking Page</h1>
            <h4 className="h4-title">
              Check out the best products by customers review
            </h4>
          </div>
          <PaginationSelector
            productsPerPage={productsPerPage}
            setProductsPerPage={setProductsPerPage}
          />
<<<<<<< HEAD:src/pages/Ranking.js
          <Card product={currentProducts}/>
          <div className=" row justify-content-center">
=======
          <div
            className="row row-cols-1 row-cols-md-5 g-4 mb-5"
            style={{ gap: "2rem 0rem" }}
          >
            {currentProducts.map((element) => {
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
                    <div className="d-flex ">
                      <div className="p-ranting">
                        {rating}
                        <Ratings>{rating}</Ratings>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="row justify-content-center">
>>>>>>> afe3ecef79339123507289d3bba7058514ae5cb7:src/pages/ranking/Ranking.js
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

export default Ranking;
