import Button from "react-bootstrap/Button";
import { useContext, useEffect, useState } from "react";
import { StateContext } from "../utils/StateContext";
import Form from "react-bootstrap/Form";
import { useForm } from "react-hook-form";
import { postProcedure } from "../services/post";
import { updateProcedure } from "../services/update";
function EditProcedure({ procedure, setShow}) {
  const { _id, name, description, price, category, time } = procedure;

  const { setUpdate, update } = useContext(StateContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const SumbitHandler = async (data) => {
    try {
      await updateProcedure(_id, data);
      setUpdate((update) => update + 1);
      setShow(false);
    } catch (err) {
      if (err.message == "Request failed with status code 403") {
        alert("only admins can create tours");
      } else {
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
    if (procedure) {
      setValue("name", name);
      setValue("description", description);
      setValue("price", price);
      setValue("category", category);
      setValue("time", time);
    }
  }, [update]);

  return (
    <>
      <div className="editPart">
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
              <Form.Label>About Procedure</Form.Label>
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
      </div>
    </>
  );
}
export default EditProcedure;
