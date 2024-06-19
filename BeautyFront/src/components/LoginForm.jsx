import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { login } from "../utils/auth/authenticate";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { StateContext } from "../utils/StateContext";
function LoginForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();
  const { setUpdate, setError, update, setNavUpdate } =
    useContext(StateContext);
  const navigate = useNavigate();

  useEffect(() => {}, [update]);

  async function onSubmit(data) {
    try {
      await login(data);
      setUpdate((update) => update + 1);
      setNavUpdate((navUpdate) => navUpdate + 1);
      navigate("/");
    } catch (err) {
      if (err.message == "request failed with status code 401") {
        setError("Invalid email or password");
        errors.email = "Invalid email or password";
      }
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <InputGroup className="mb-3">
            <Form.Group className="mb-3" >
              <Form.Label>Email address:</Form.Label>
              <Form.Control
                placeholder="Enter Your Email"
                aria-label="Email"
                aria-describedby="basic-addon2"
                type="text"
                id="email"
                {...register("email", {
                  required: "Email adress is required",
                })}
                isInvalid={errors.email}
              />
              <Form.Control.Feedback type="invalid">
                {errors.email && errors.email.message}
              </Form.Control.Feedback>
            </Form.Group>
          </InputGroup>
        </div>
        <div>
        <InputGroup className="mb-3">
            <Form.Group className="mb-3">
              <Form.Label>Password:</Form.Label>
              <Form.Control
                type="password"
                id="password"
                placeholder="Enter your Password"
                aria-describedby="passwordHelpBlock"
                {...register("password", {
                  required: "Password is required",
                })}
                isInvalid={errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password && errors.password.message}
              </Form.Control.Feedback>
            </Form.Group>
          </InputGroup>
        </div>
        
        <Button variant="primary" type="submit" disabled={isSubmitting}>
          Login
        </Button>
        <div>don't have an account?Register!</div>
        <Button variant="primary" onClick={() => navigate("/register")}>
          Register
        </Button>
      </form>
    </>
  );
}

export default LoginForm;
