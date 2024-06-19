import { useForm } from "react-hook-form";
import { useContext, useState, useEffect } from "react";
import { StateContext } from "../utils/StateContext";
import Form from "react-bootstrap/Form";
import { postReview } from "../services/post";
import Button from "react-bootstrap/Button";

function ReviewForm({ tourId }) {
  const { update, setUpdate } = useContext(StateContext);
  const [rating, setRating] = useState(0);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const SubmitHandler = async (data) => {
    try {
      console.log(data);
      await postReview(data, tourId);
      setUpdate((update) => update + 1);
      reset();
    } catch (err) {
      if (err.message == "Cannot read properties of null (reading 'token')") {
        alert("please login");
      } else {
        console.log(err.message);
      }
    }
  };
  useEffect(() => {}, [update, rating]);

  return (
    <>
    <div className="review">
      <Form onSubmit={handleSubmit(SubmitHandler)}>
        <div>
          <Form.Label>Rate your experience</Form.Label>
          <Form.Group className="mb-3">
            {Array.from({ length: 5 }).map((_, index) => (
              <Form.Check
              inline
                key={index}
                type="radio"
                name="rating"
                value={index + 1}
                label={index + 1}
                onClick={(e) => setRating(parseInt(e.target.value, 10))}
                {...register("rating", { required: true })}
                isInvalid={errors.rating}
              />
            ))}
            <Form.Control.Feedback type="invalid">
              {errors.rating && errors.rating.message}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <div>
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              placeholder="Leave a comment"
              isInvalid={errors.comment}
              {...register("comment", { required: true, maxLength: 80 })}
            />
            <Form.Control.Feedback type="invalid">
              {errors.comment && errors.comment.message}
            </Form.Control.Feedback>
          </Form.Group>
        </div>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
      </div>
    </>
  );
}

export default ReviewForm;
