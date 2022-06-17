import "../assets/styles/index.css";
import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import Img from "../assets/images/beauty.jpg";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "../apis/api";

function Home() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await api.get("/products");
        console.log(response.data);
        setProducts([...response.data]);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />

      <div id="myCarousel">
        <div className="carousel-inner">
          <img className="hero-img" src={Img} alt="First slide" />

          <div className="container">
            <div className="carousel-caption text-start cover-container d-flex flex-column">
              <h1>
                True beauty comes
                <br /> from within
              </h1>
              <p className="carousel-caption-text">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                <br />
                Pellentesque pharetra at elit at aliquet.{" "}
              </p>
              <Link className="btn btn-lg carousel-caption-btn" to="#">
                Sign up today
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div className="row">
          {products.map((product) => {
            const { productName, imageIcon, brandName, rating } = product;

            return (
              <div className="col-4">
                <div className="card" style={{ width: "18rem" }}>
                  <img src={imageIcon} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h5 className="card-title">{productName}</h5>
                    <p className="card-text">{brandName}</p>
                    <p className="card-rating">{rating}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <footer className="container">
        <p className="float-end">
          <link to="#" />
          Back to top
        </p>
        <p>
          &copy; 2017–2022 Company, Inc. &middot; <link to="#" />
          Privacy &middot; <link to="#" />
          Terms
        </p>
      </footer>

      <script src="../assets/dist/js/bootstrap.bundle.min.js"></script>
    </div>
  );
}

export default Home;
