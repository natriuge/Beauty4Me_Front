import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

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
              {/* <ReactStars
                 count={props.count}
                 onChange={ratingChanged}
                 size={24}
                 activeColor="#ffd700"
        /> */}
              <Form.Label>Comment</Form.Label>
              <Form.Control
                type="form"
                onChange={props.handleChange}
                value={props.value}
                name={props.name}
                style={{ marginTop: "0.5rem", width: "18rem" }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
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
