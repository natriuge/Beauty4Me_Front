import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../apis/api";

import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../components/Navbar";
import "../assets/styles/rankingStyle.css";

function Ranking() {
  const [state, setState] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get("/products");

        setState([...response.data]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div className="container mt-5">
      <Navbar />

      <div className="mb-5">
        <h1 className="h1-title">Ranking Page</h1>
        <h4 className="h4-title">
          Check out the best products by customers review
        </h4>
      </div>

      <div
        className="row row-cols-1 row-cols-md-5 g-4 mb-5"
        style={{ gap: "2rem 0rem" }}
      >
        {state.map((element) => {
          const { _id, productName, brandName, rating, imageDetails } = element;

          return (
            <div key={_id} className="col">
              <div className="card h-100">
                <div className="prod-card-container">
                  <img
                    src={imageDetails}
                    className="card-img-top prod-img"
                    alt={productName}
                  />
                  <div className="card-middle-ranking">
                    <button className="btn card-text-ranking">
                      <i className="bi bi-search"></i>
                    </button>
                  </div>
                </div>
                <div className="card-body">
                  <h6 className="card-title h6-name">{productName}</h6>
                  <p className="card-text p-brand-name">{brandName}</p>
                  <p className="card-text p-ranting">{rating}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Ranking;
