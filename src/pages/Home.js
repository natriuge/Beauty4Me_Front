import "../assets/styles/home.css";
import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import { Link } from "react-router-dom";
import api from "../apis/api";
import Card from "../components/Card";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true);
        const response = await api.get("/products");
        setProducts([...response.data]);
        setLoading(false);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProducts();
  }, []);

  return (
    <div>
      <Navbar />

      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          <div id="home-layout">
            <div className="hero-img" />
            <div className="hero-text">
              <h1 className="responsive-slogan">
                True beauty comes
                <br /> from within
              </h1>
              <p className="responsive-txt">
                Search products, share your reviews with others
                <br />
                and create your favorite skincare list.{" "}
              </p>
              <button type="button" class="btn btn-primary">
                Sign up today
              </button>
            </div>
          </div>

          <Card product={products} />

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
        </>
      )}
    </div>
  );
}

export default Home;
