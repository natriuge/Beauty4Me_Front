const Rating = (props) => {
  let rate = Math.round(Number(props.children));

  let filledStars = [...new Array(rate)];
  let emptyStars = [...new Array(5 - rate)];

  return (
    <div>
      {filledStars.map((star, idx) => (
        <i key={idx} className="bi bi-star-fill" aria-hidden="true"></i>
      ))}

      {emptyStars.map((star, idx) => (
        <i key={idx} className="bi bi-star" aria-hidden="true"></i>
      ))}
    </div>
  );
};

export default Rating;
