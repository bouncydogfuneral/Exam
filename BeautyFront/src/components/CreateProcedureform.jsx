import { useForm } from "react-hook-form";
import { postTour } from "../services/post";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useEffect, useContext, useState } from "react";
import { StateContext } from "../utils/StateContext";
import Button from "react-bootstrap/Button";

function CreateProcedureForm() {
  const { update, setUpdate } = useContext(StateContext);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const SumbitHandler = async (data) => {
    try {
      console.log(data);
      await postTour(data);
      setUpdate((update) => update + 1);
      reset();
    } catch (err) {
      if (err.message == "Request failed with status code 403") {
        alert("only admins can create tours");
      } else {
        console.log(err.message);
      }
    }
  };
  useEffect(() => {}, [update]);

  return (
    <>
      <form onSubmit={handleSubmit(SumbitHandler)}>
        <div>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name of the procedure</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter A name"
              {...register("name", { required: "name is required" })}
            />
          </Form.Group>
        </div>
        <div>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="Describe the procedure"
              {...register("description", {
                required: "description is required",
              })}
            />
          </Form.Group>
        </div>
        <div>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Category</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter A category"
              {...register("category", { required: "category is required" })}
            />
          </Form.Group>
        </div>
        <div>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Price for the procedure"
              {...register("price", { required: "price is required" })}
            />
          </Form.Group>
        </div>
        <div>
          <input
            type="time"
            {...register("time", { required: "time is required" })}
          />
        </div>
        <Button variant="primary" type="submit">
          Create
        </Button>
      </form>
    </>
  );
}

export default CreateProcedureForm;
