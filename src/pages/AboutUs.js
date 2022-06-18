import { useState } from "react";
import Navbar from "../components/Navbar";
import LoadingSpinner from "../components/LoadingSpinner";
import "../assets/styles/noutFound.css";
import "bootstrap/dist/css/bootstrap.min.css";
import hands from "../assets/images/hands.jpg";

function AboutUs() {
  const [loading] = useState(false);

  return (
    <div className="mt-5">
      <Navbar />
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {/* <div className="container mt-5">
            <div className="row-sm-12 align-self-center text-sm-center css-responsive-nf">
              <h1 className="h1-title-nf">Page Not Found!</h1>
              <h4 className="h4-title-nf">This page does not exist.</h4>
              <img
                src={hands}
                className="image-dec-nf image-dec-responsive-nf"
                alt="hands ilustration"
              />
            </div>
          </div> */}
        </>
      )}
    </div>
  );
}

export default AboutUs;
