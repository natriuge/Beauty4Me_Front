import Navbar from "../../components/Navbar";
import "../about-us/aboutUsStyle.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import hands from "../../assets/images/hands.jpg";

function AboutUs() {
  return (
    <div className="mt-5">
      <Navbar />
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
    </div>
  );
}

export default AboutUs;
