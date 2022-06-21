import ReactStars from "../../components/ranking-rating/FixedRatingStars";

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
          count={5} //props
          onChange={ratingChanged} //mexer no onChange
          size={24}
          activeColor="#ffd700"
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
        {/* <button 
        type="submit"
         className="btn btn-outline-secondary mt-2" 
         onClick={props.onClick}>
          <strong>send</strong>
        </button> */}
      </div>
    </div>
  );
};
export default ReviewForm;
