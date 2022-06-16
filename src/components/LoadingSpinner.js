function LoadingSpinner() {
  return (
    <div className="container">
      <div className="d-flex justify-content-center">
        <div className="spinner-border text-info" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  );
}
export default LoadingSpinner;
