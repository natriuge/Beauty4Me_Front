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
import ToggleButton from "react-bootstrap/ToggleButton";
import "../ProductDetail/productDetails.css";
import "../ranking/rankingStyle.css";

function ProductDetails() {
  const [product, setProduct] = useState();
  const [userReviews, setUserReviews] = useState([]);
  const [activeTab, setActiveTab] = useState("tab1");
  const [checked, setChecked] = useState(false);
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

  const { loggedInUser, setLoggedInUser, loading, handleLogout } =
    useContext(AuthContext);

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
      const response = await api.patch(`/review/${userReviews[0]._id}`, clone);
      setUserReviews([...userReviews, response.data]);
    } catch (err) {
      console.error(err.reponse);
      // return setErrors({ ...err.response.data.errors });
    }
<<<<<<< HEAD
  }

  function updateUserReviewHandleChange(event) {
    setUserReviewUpdate({
      ...userReviews,
      // productId: id,
      // authorName: loggedInUser.user.name,
      [event.target.name]: event.target.value,
    });
  }

=======
  }

  function updateUserReviewHandleChange(event) {
    setUserReviewUpdate({
      ...userReviews,
      // productId: id,
      // authorName: loggedInUser.user.name,
      [event.target.name]: event.target.value,
    });
  }

>>>>>>> 41f4841481583e17378b30c102e216b2a51570ce
  async function addFavoriteProduct() {
    try {
      console.log(id);
      const response = await api.patch(`/product/${id}`);
      console.log(response.data);
    } catch (err) {
      console.error(err.reponse);
      // setErrors({ ...err.response.data.errors });
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
<<<<<<< HEAD

=======
  // const authorsId = userReviews.map((reviews) => reviews.authorId);

  //  function isAuthor() {
  //   const authorsId = userReviews.map(reviews => reviews.authorId)
  //   const id = authorsId.map((authorId) => authorId === loggedInUser.user._id);
  //   console.log( "id", id);
  //   console.log("logged user id", loggedInUser.user._id);
  //    return id;
  //  }

>>>>>>> 41f4841481583e17378b30c102e216b2a51570ce
  function isAuthor(id) {
    return loggedInUser.user._id === id;
  }
  return (
    <>
      {product && (
        <div key={product._id}>
          <div className="product-container">
            <div>
              <img
                src={product.imageDetails}
                alt={product.productName}
                className="product-image"
              />
            </div>
            <div className="align-text">
              <p
                style={{
                  fontSize: "1.5rem",
                  textTransform: "uppercase",
                  fontWeight: "bold",
                }}
                className="ml-5 mt-5 mb-0"
              >
                {product.brandName}
              </p>
              <p
                style={{ fontSize: "1rem", textTransform: "uppercase" }}
                className="ml-5"
              >
                {product.productName}
              </p>
              <div className="ml-5 mt-5">
                <h5>
                  <strong>RATING</strong>
                </h5>
<<<<<<< HEAD

                <ReactStars
                  count={5}
                  value={product.rating}
                  size={24}
                  activeColor="#ffd700"
                  isHalf={true}
                  edit={false}
                />
=======
                <Ratings>{product.rating}</Ratings>
>>>>>>> 41f4841481583e17378b30c102e216b2a51570ce

                <button onClick={addFavoriteProduct}>favorite</button>

                <ToggleButton
                  className="mb-2"
                  id="toggle-check"
                  type="checkbox"
                  variant="outline-primary"
                  checked={checked}
                  value="1"
                  onChange={(e) => setChecked(e.currentTarget.checked)}
                >
                  <h5>+</h5>
                </ToggleButton>
              </div>
              <h5 className="ml-5 mt-5">
                <strong>AVERAGE PRICE</strong>
              </h5>
              <h5 className="ml-5">{product.averagePrice}</h5>
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
<<<<<<< HEAD
                    <ReactStars
                      count={5}
                      value={review.Rating}
                      size={24}
                      activeColor="#ffd700"
                      isHalf={true}
                      edit={false}
                    />

=======
                    {/* <Ratings>{review.Rating}</Ratings> */}
>>>>>>> 41f4841481583e17378b30c102e216b2a51570ce
                    <strong className="mb-5">{review.UserNickname}</strong>
                    <br />
                  </div>
                  <em>{review.ReviewText}</em>
                  <hr className="featurette-divider" />
                </div>
              );
            })}
            {userReviews.map((userReview, index) => {
              console.log("user Review", userReviews);
              return (
                <div key={userReview._id}>
                  {/* <div> */}
                  {isAuthor(userReview.authorId) && (
                    <div>
                      <button onClick={() => deleteUserReview(userReview._id)}>
                        delete
                      </button>
                      <button
                        id={userReview._id}
                        onClick={(event) => {
                          console.log("TARGET AQUI Ó", event.target);
                          console.log("TARGET ID ID", event.target.id);
                          setUserReviews([userReviews[index]]);
                          setUserReviewUpdate({ ...userReviews[index] });
                          setShowModal(true);
                        }}
                      >
<<<<<<< HEAD
                        edit
=======
                        editar
>>>>>>> 41f4841481583e17378b30c102e216b2a51570ce
                      </button>

                      {/*                     
                      <button onClick={() =>  }>
                        edit
                      </button> */}
                    </div>
                  )}
                  {/* <Ratings>{userReview.Rating}</Ratings> */}
                  {/* <strong className="mb-5">{userReview.UserNickname}</strong> */}
                  {/* <br /> */}
                  {/* </div> */}
                  {/* {isAuthor() && (
                    <div>
                     escrita por
                    <p>{loggedInUser.user.name}</p>
                    </div>
                   )} */}
                  <br />
                  <p>{userReview.authorName}</p>
                  <p>{userReview.comment}</p>
                  <ReactStars
                    count={5}
                    value={userReview.authorRating}
                    size={24}
                    activeColor="#ffd700"
                    isHalf={true}
                    edit={false}
                  />
                  {/* TEM Q RENDERIZAR O NOME DO USER(AUTHOR) */}
                  <hr className="featurette-divider" />
                </div>
              );
            })}
          </div>
          {/* só aparece se o user não estiver logado */}
          <div className="align-items">
            To create a review you need to be&nbsp;
            <Link className="nav-link active text-dark pl-1" to="/login">
              <strong>logged!</strong>
            </Link>
          </div>
<<<<<<< HEAD
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
=======
          {/* {isAuthor() && ( */}
          <div className="review-form mt-0">
            <ReviewForm
              type="form"
              id="newReview"
              value={newReview.comment}
              name="comment"
              onChange={handleChange}
              // onClick={handleSubmit}
            />
            <button
              type="submit"
              className="btn btn-outline-secondary mt-2"
              onClick={handleSubmit}
            >
              <strong>send</strong>
            </button>
          </div>
          {/* )} */}
>>>>>>> 41f4841481583e17378b30c102e216b2a51570ce
          <EditReviewModal
            show={showModal}
            setShowModal={setShowModal}
            handleClose={handleClose}
            handleUpdate={updateUserReview}
            handleChange={updateUserReviewHandleChange}
            value={userReviewUpdate.comment}
            name="comment"
          />
<<<<<<< HEAD
=======

>>>>>>> 41f4841481583e17378b30c102e216b2a51570ce
        </div>
      )}
    </>
  );
}
export default ProductDetails;
