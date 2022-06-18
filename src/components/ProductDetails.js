import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import { axios } from "axios";
import api from "../../src/apis/api";
import HTMLReactParser from "html-react-parser";

function ProductDetails() {
  const [productsList, setProductsList] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    getProductsList();
  }, []);

  async function getProductsList() {
    try {
      const response = await api.get("/products");
      console.log(response.data);
      setProductsList([...response.data]);
    } catch (err) {
      console.error(err.response);
    }
  }

  console.log(productsList);

  return (
    <>
      {productsList.map((currentProduct) => {
        return (
          <div key={currentProduct._id}>
            <p
              style={{
                fontSize: "1.5rem",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
              className="ml-5 mt-5 mb-0"
            >
              {currentProduct.brandName}
            </p>
            <p
              style={{ fontSize: "1rem", textTransform: "uppercase" }}
              className="ml-5"
            >
              {currentProduct.productName}
            </p>
            <div>
              <img
                style={{ width: "30%" }}
                src={currentProduct.imageDetails}
                alt={currentProduct.productName}
                className="ml-5"
              />
            </div>
            <div>
              <p className="ml-5">
                {HTMLReactParser(currentProduct.shortDescription)}
              </p>
            </div>
          </div>
        );
      })}
    </>
  );
}
export default ProductDetails;
