import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import ReactStars from "react-rating-stars-component";
import api from "../../apis/api";
import ReviewForm from "../../components/Review/ReviewForm";
import HTMLReactParser from "html-react-parser";
import EditReviewModal from "../../components/EditReviewModal";
import { AuthContext } from "../../contexts/authContext";
import { VscEdit } from "react-icons/vsc";
import Button from "react-bootstrap/Button";
import { BsTrash } from "react-icons/bs";
import { BsFillHeartFill } from "react-icons/bs";
import ToggleButton from "react-bootstrap/ToggleButton";
import "../ProductDetail/productDetails.css";
import "../ranking/rankingStyle.css";

function ProductDetails() {
  const [product, setProduct] = useState();
  const [userReviews, setUserReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("tab1");
  const [newReview, setNewReview] = useState({
    authorName: "",
    authorId: null,
    comment: "",
    authorRating: 0,
    productId: null,
  });
  const [errors, setErrors] = useState({
    authorName: null,
    authorId: null,
    comment: null,
    authorRating: null,
    productId: null,
  });
  const [userReviewUpdate, setUserReviewUpdate] = useState({
    authorName: "",
    authorId: null,
    comment: "",
    authorRating: 0,
    productId: null,
  });

  const handleShow = (_id) => {
    setUserReviews(_id);
    setShowModal(true);
  };

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const { loggedInUser } = useContext(AuthContext);

  const handleTab1 = () => {
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    setActiveTab("tab2");
  };
  const handleTab3 = () => {
    setActiveTab("tab3");
  };

  async function getProduct() {
    try {
      const response = await api.get(`/product/${id}`);
      setProduct(response.data);
    } catch (err) {
      console.error(err.response);
    }
  }

  async function getUsersReviews() {
    try {
      const response = await api.get(`/review?id=${id}`);
      setUserReviews(response.data);
    } catch (err) {
      console.error(err.response);
    }
  }

  useEffect(() => {
    getProduct();
  }, [id]);

  // This will only run after the product update
  useEffect(() => {
    getUsersReviews();
  }, [product]);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post("/review", newReview);
      // Add new review to the list of user's reviews
      setUserReviews([...userReviews, response.data]);

      setErrors({
        authorName: "",
        authorId: null,
        comment: "",
        authorRating: 0,
        productId: null,
      });
      // navigate("/")
    } catch (err) {
      console.error(err.response);
      return setErrors({ ...err.response.data.errors });
    }
  }

  async function deleteUserReview(reviewId) {
    try {
      const response = await api.delete(`/review/${reviewId}`);
      // Add new review to the list of user's reviews
      const newReviews = userReviews.filter(
        (reviews) => reviews._id !== response.data._id
      );
      setUserReviews(newReviews);
    } catch (err) {
      console.error(err.response);
      return setErrors({ ...err.response.data.errors });
    }
  }

  async function updateUserReview() {
    try {
      const clone = { ...userReviewUpdate };
      delete clone._id;

      const response = await api.patch(
        `/review/${userReviewUpdate._id}`,
        clone
      );

      const newUserReviews = userReviews.map((review) => {
        if (review._id === response.data._id) {
          review.authorRating = response.data.authorRating;
          review.comment = response.data.comment;
        }

        return review;
      });

      setUserReviews(newUserReviews);
    } catch (err) {
      console.error(err.reponse);
      // return setErrors({ ...err.response.data.errors });
    }
  }

  function updateUserReviewHandleChange(event) {
    setUserReviewUpdate({
      ...userReviewUpdate,
      [event.target.name]: event.target.value,
    });
  }

  async function addFavoriteProduct() {
    try {
      const response = await api.patch(`/product/${id}`);
    } catch (err) {
      console.error(err.response);
    }
  }

  function handleChange(event) {
    setNewReview({
      ...newReview,
      productId: id,
      authorName: loggedInUser.user.name,
      [event.target.name]: event.target.value,
    });
  }

  function isAuthor(id) {
    return loggedInUser.user._id === id;
  }

  return (
    <>
      {product && (
        <div key={product._id}>
          <div className="product-container Tabs">
            <div>
              <img
                className="product-image"
                src={product.imageDetails}
                alt={product.productName}
              />
            </div>
            <div className="align-text">
              <p
                style={{
                  fontSize: "1.5rem",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                  textDecoration: "underline 3px #60dbf1",
                  textUnderlineOffset: "4px",
                }}
                className="ml-5 mt-0 mb-0"
              >
                {product.brandName}
              </p>
              <p
                style={{
                  fontSize: "1rem",
                  textTransform: "uppercase",
                  marginTop: "10px",
                }}
                className="ml-5"
              >
                {product.productName}
              </p>
              <div className="ml-5 mt-5">
                <h5>
                  <strong>RATING</strong>
                </h5>

                <ReactStars
                  count={5}
                  value={product.rating}
                  size={27}
                  activeColor="#2b2b2b"
                  color="#c6c6c6"
                  isHalf={true}
                  edit={false}
                />
              </div>
              <h5 className="ml-5 mt-5">
                <strong>AVERAGE PRICE</strong>
              </h5>
              <h5 className="ml-5">{product.averagePrice}</h5>

              <div
                className="btn-group mt-5"
                role="group"
                aria-label="Basic checkbox toggle button group"
              >
                <input
                  type="checkbox"
                  className="btn-check"
                  id="btncheck1"
                  autocomplete="off"
                  onClick={addFavoriteProduct}
                />
                <label className="btn btn-outline-secondary" for="btncheck1">
                  <BsFillHeartFill />
                </label>
              </div>
              {/* <div
                className="btn-group mt-5"
                role="group"
                aria-label="Basic checkbox toggle button group"
              >
                <input
                  type="checkbox"
                  className="btn-check"
                  id="btncheck1"
                  autocomplete="off"
                  onClick={addFavoriteProduct}
                />
                <label className="btn btn-fav" htmlFor="btncheck1">
                  <BsFillHeartFill className="BsFillHeartFill-fav" />
                </label>
              </div>
              <h5>Add to favorites</h5> */}
            </div>
          </div>
          <div className="Tabs">
            <ul className="nav mb-2 mt-3">
              <li
                className={activeTab === "tab1" ? "active" : ""}
                onClick={handleTab1}
              >
                <h5>DESCRIPTION</h5>
              </li>
              <li
                className={activeTab === "tab2" ? "active" : ""}
                onClick={handleTab2}
              >
                <h5>HOW TO USE</h5>
              </li>
              <li
                className={activeTab === "tab3" ? "active" : ""}
                onClick={handleTab3}
              >
                <h5>INGREDIENTS</h5>
              </li>
            </ul>
            <div className="outlet">
              {activeTab === "tab1"
                ? HTMLReactParser(product.longDescription)
                : activeTab === "tab2"
                ? HTMLReactParser(product.howToUse)
                : HTMLReactParser(product.ingredients)}
            </div>
            <hr className="featurette-divider mb-3 mt-5" />
            <div className="mb-5">
              <h5>
                <strong className="text-background">PRODUCT REVIEWS</strong>
              </h5>
            </div>
            {product.sephoraReviews.map((review, index) => {
              return (
                <div key={`${review.ProductId}__${index}`}>
                  <div></div>
                  <div>
                    <ReactStars
                      count={5}
                      value={review.Rating}
                      size={20}
                      activeColor="#2b2b2b"
                      color="#c6c6c6"
                      isHalf={true}
                      edit={false}
                    />

                    <strong className="mb-5">{review.UserNickname}</strong>
                    <br />
                  </div>
                  <em>{review.ReviewText}</em>
                  <hr className="featurette-divider" />
                </div>
              );
            })}
            {userReviews.map((userReview, index) => {
              return (
                <div key={userReview._id}>
                  {isAuthor(userReview.authorId) && (
                    <div>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        border="none"
                        onClick={() => deleteUserReview(userReview._id)}
                      >
                        <BsTrash />
                      </Button>
                      <Button
                        className="button-edit"
                        variant="outline-secondary"
                        size="sm"
                        border="none"
                        id={userReview._id}
                        onClick={(event) => {
                          setUserReviewUpdate(userReviews[index]);
                          setShowModal(true);
                        }}
                      >
                        <VscEdit />
                      </Button>
                    </div>
                  )}

                  <ReactStars
                    key={userReview.authorRating}
                    count={5}
                    value={userReview.authorRating}
                    size={20}
                    activeColor="##2b2b2b"
                    color="#c6c6c6"
                    isHalf={false}
                    edit={false}
                  />
                  <strong>{userReview.authorName}</strong>
                  <p>
                    <em>{userReview.comment}</em>
                  </p>
                  <hr className="featurette-divider" />
                </div>
              );
            })}
          </div>

          {!loggedInUser.user._id && (
            <div className="align-items">
              To create a review you need to be&nbsp;
              <Link className="nav-link active text-dark pl-1" to="/login">
                <strong>logged!</strong>
              </Link>
            </div>
          )}
          {loggedInUser.user._id && (
            <div className="review-form mt-0">
              <ReviewForm
                type="form"
                id="newReview"
                value={newReview.comment}
                name="comment"
                onChange={handleChange}
                onRatingChange={(newRating) => {
                  setNewReview({ ...newReview, authorRating: newRating });
                }}
                count={newReview.authorRating}
              />
              <button
                type="submit"
                className="btn btn-outline-secondary mt-2"
                onClick={handleSubmit}
              >
                <strong>send</strong>
              </button>
            </div>
          )}
          <EditReviewModal
            show={showModal}
            setShowModal={setShowModal}
            handleClose={handleClose}
            handleUpdate={updateUserReview}
            handleChange={updateUserReviewHandleChange}
            value={userReviewUpdate.comment}
            name="comment"
            onRatingChange={(newRating) => {
              setUserReviewUpdate({
                ...userReviewUpdate,
                authorRating: newRating,
              });
            }}
            count={userReviewUpdate.authorRating}
          />
        </div>
      )}
    </>
  );
}
export default ProductDetails;
