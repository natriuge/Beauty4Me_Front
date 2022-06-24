import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ReactStars from "react-rating-stars-component";
function EditReviewModal(props) {
  //     const ReviewForm = (props) => {
  //   const ratingChanged = (newRating) => {
  //     console.log(newRating);

  return (
    <div>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <ReactStars
                count={5}
                value={props.count}
                onChange={props.onRatingChange}
                size={24}
                activeColor="#ffd700"
                isHalf={false}
              />
              <Form.Label>
                <strong>Comment</strong>
              </Form.Label>
              <Form.Control
                type="form"
                as="textarea"
                rows={4}
                onChange={props.handleChange}
                value={props.value}
                name={props.name}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button
            variant="outline-secondary"
            onClick={() => {
              props.setShowModal(false);
              props.handleUpdate();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditReviewModal;

