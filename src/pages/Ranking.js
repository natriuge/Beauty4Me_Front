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
        <h1>Ranking Page</h1>
        <h4>Check out the best products by customers review</h4>
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
                    <div className="card-text-ranking">Go to product</div>
                  </div>
                </div>

                <div className="card-body">
                  <h5 className="card-title">{productName}</h5>
                  <p className="card-text">{brandName}</p>
                  <p className="card-text">{rating}</p>
                </div>
                <div>
                  <button
                    className="btn col" //fazer css do btn
                    type=""
                    //value={} qual é?
                    //onClick={} ir para detail do produto
                  >
                    {" "}
                    Check it out!
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <div className="col">
          <div className="card h-100">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">This is a short card.</p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content.
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="card h-100">
            <img src="..." className="card-img-top" alt="..." />
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer. This is a longer card with supporting text below as a
                natural lead-in to additional content. This content is a little
                bit longer.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Ranking;
