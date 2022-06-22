import "../home/home.css";
import React from "react";
import { useState, useEffect } from "react";
import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";
import api from "../../apis/api";
import Ratings from "../../components/ranking-rating/FixedRatingStars";
import { useNavigate } from "react-router-dom";
import Carousel from "react-elastic-carousel";

function Home() {
  const [state, setState] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(0);

  const pages = Math.ceil(state.length / productsPerPage);

  const startIndex = currentPage * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = state.slice(startIndex, endIndex);
  console.log("currentProducts", currentProducts);

  const navigate = useNavigate();

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
  }, [errorMessage]);

  // console.log("STATE RANKING", state);

  useEffect(() => {
    setCurrentPage(0);
  }, [productsPerPage]);

  const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2 },
    { width: 550, itemsToShow: 3 },
    { width: 550, itemsToShow: 4 },
  ];

  return (
    <div>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="home-layout">
            <div className="hero-img" />
            <div className="hero-text">
              <h1 className="responsive-slogan m-3">
                True beauty comes
                <br /> from within
              </h1>
              <p className="responsive-txt">
                Search products, share your reviews with others
                <br />
                and create your favorite skincare list.{" "}
              </p>
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => navigate("/signup")}
              >
                Sign up today
              </button>
            </div>
          </div>

          <div className="container mt-5">
            <h1 className="h1-title m-5">YOU MAY LIKE</h1>
            <div className="row">
              <Carousel breakPoints={breakPoints}>
                {state.map((element) => (
                  <div className="container">
                    <div key={element._id} className="col">
                      <div className="card h-100 d-flex border-card">
                        <div className="prod-card-container">
                          <img
                            src={element.imageDetails}
                            className="card-img-top prod-img p-3"
                            alt={element.productName}
                          />
                          <div className="card-middle-ranking">
                            <button
                              onClick={() =>
                                navigate(`/product-detail/${element._id}`)
                              }
                              className="btn card-text-ranking"
                            >
                              <i className="bi bi-search"></i>
                            </button>
                            {element._id}
                          </div>
                        </div>
                        <div className="card-body flex-grow-1">
                          <h6 className="card-title h6-name">
                            {element.productName}
                          </h6>
                          <p className="card-text p-brand-name">
                            {element.brandName}
                          </p>
                        </div>
                        <div className="d-flex">
                          <div className="p-ranting">
                            {element.rating}
                            <Ratings>{element.rating}</Ratings>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
            <div className="row justify-content-center"></div>
          </div>

          <footer className="container text-center mt-5">
            <p className="footer-txt">São Paulo, Junho de 2022</p>
          </footer>
        </>
      )}
    </div>
  );
}

export default Home;
