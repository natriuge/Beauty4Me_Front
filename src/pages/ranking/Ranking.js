import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../apis/api";
import LoadingSpinner from "../../components/loading-spinner/LoadingSpinner";
import Pagination from "../../components/pagination/Pagination";
import PaginationSelector from "../../components/pagination/PaginationSelector";
import ReactStars from "react-rating-stars-component";
import { Button } from "react-bootstrap";
import { BsSearch } from "react-icons/bs";

import "../ranking/rankingStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";

function Ranking() {
  const [state, setState] = useState([]);
  const [setErrorMessage] = useState("");
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
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [productsPerPage]);

  return (
    <div className="container mt-5">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div className="mb-5 justify-content-center text-center">
            <h3 className="mb-5">
              <strong className="text-background-h3-ranking">
                RANKING PAGE
              </strong>
            </h3>
            <h4 className="h4-title-ranking">
              Check out products best evaluated by customers
            </h4>
          </div>
          <PaginationSelector
            productsPerPage={productsPerPage}
            setProductsPerPage={setProductsPerPage}
          />
          <div
            className="row  row-cols-1 row-cols-md-5 g-4 mb-5"
            style={{ gap: "2rem 0rem" }}
          >
            {currentProducts.map((element) => {
              const { _id, productName, brandName, rating, imageDetails } =
                element;
              return (
                <div key={_id} className="col">
                  <div className="card h-100 d-flex">
                    {/* <div className="card h-100 d-flex border-card-ranking"> */}
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
          <div className="row justify-content-center text-center">
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
