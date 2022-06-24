import ReactStars from "react-rating-stars-component";

function ReviewForm(props) {
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
          value={props.count}
          onChange={props.onRatingChange}
          size={24}
          activeColor="#ffd700"
          isHalf={true}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="exampleFormControlTextarea1" className="form-label">
          <strong>Your review</strong>
        </label>
        <textarea
          className="form-control"
          id={props.id}
          rows="3"
          type={props.type}
          value={props.value}
          name={props.name}
          onChange={props.onChange}
        ></textarea>
      </div>
    </div>
  );
}
export default ReviewForm;

