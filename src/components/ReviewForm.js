import ReactStars from "../components/ranking-rating/FixedRatingStars";

const ReviewForm = (props) => {
  const ratingChanged = (newRating) => {
    console.log(newRating);
  };
  return (
    <div>
      <div>
        <label>
          <h5>
            <strong className="text-background">CREATE A REVIEW</strong>
          </h5>
        </label>
        <ReactStars
          count={5}
          onChange={ratingChanged}
          size={24}
          activeColor="#ffd700"
        />
      </div>
      <div className="mb-3">
        <label for="exampleFormControlTextarea1" className="form-label">
          <strong>Your review</strong>
        </label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
        ></textarea>
        <button type="button" className="btn btn-outline-secondary mt-2">
          <strong>send</strong>
        </button>
      </div>
    </div>
  );
};
export default ReviewForm;
