import { useForm } from "react-hook-form";
import { useState, useContext } from "react";
import { signUp } from "../utils/auth/authenticate";
import { Button, Form } from "react-bootstrap";
import { StateContext } from "../utils/StateContext";
import InputGroup from "react-bootstrap/InputGroup";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const { update, setUpdate, setNavUpdate, navUpdate } =
    useContext(StateContext);
  const [error, setError] = useState("");
  const [emailUsed, setEmailUsed] = useState("");

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  async function SubmitHandler(data) {
    try {
      await signUp(data);
      setUpdate(() => update + 1);
      setNavUpdate((navUpdate) => navUpdate + 1);
      navigate("/");
    } catch (err) {
      if (error.message === "Request failed with status code 500")
        setEmailUsed("This email already exists");
      setError(error.response.data.message);
    }
  }
  return (
    <>
      <form onSubmit={handleSubmit(SubmitHandler)}>
        <div>Register!</div>
        <div>
          <InputGroup className="mb-3">
            <Form.Group className="mb-3" controlId="Name">
              <Form.Label>First name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                {...register("firstName", { required: "name is required" })}
                isInvalid={errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name && errors.name.message}
              </Form.Control.Feedback>
            </Form.Group>
          </InputGroup>
        </div>
        {/* <div>
          <InputGroup className="mb-3">
            <Form.Group className="mb-3" controlId="Name">
              <Form.Label> name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                {...register("lastName", { required: "name is required" })}
                isInvalid={errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name && errors.name.message}
              </Form.Control.Feedback>
            </Form.Group>
          </InputGroup>
        </div> */}
        <div>
          <InputGroup className="mb-3">
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address:</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                {...register("email", { required: "Email adress is required" })}
                isInvalid={errors.email}
              />
              {emailUsed && (
                <Form.Control.Feedback type="invalid">
                  {emailUsed}
                </Form.Control.Feedback>
              )}
            </Form.Group>
          </InputGroup>
        </div>
        <div>
          <InputGroup className="mb-3">
            <Form.Group className="mb-3" controlId="Password">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter Your Password"
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters!",
                  },
                })}
                isInvalid={errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password && errors.password.message}
              </Form.Control.Feedback>
            </Form.Group>
          </InputGroup>
        </div>
        <div>
          <InputGroup className="mb-3">
            <Form.Group className="mb-3" controlId="RepeatPass">
              <Form.Control
                type="password"
                placeholder="Repeat Your Password"
                {...register("passwordConfirm", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Password must be at least 8 characters!",
                  },
                })}
                isInvalid={errors.passwordConfirm}
              />
              <Form.Control.Feedback type="invalid">
                {errors.passwordConfirm && errors.passwordConfirm.message}
              </Form.Control.Feedback>
            </Form.Group>
          </InputGroup>
          <Button variant="primary" type="submit" disabled={isSubmitting}>
            Create an account!
          </Button>
        </div>
      </form>
    </>
  );
}

export default RegisterForm;
