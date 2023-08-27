import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import FormContainer from "../component/FormContainer";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useLoginMutation } from "../slices/userApiSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import Loader from "../component/Loader";
function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // after calling login function from this component toolkit gives state data.
  const [login, { isSuccess, isError, isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  // run reducers actions
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess || isError) {
      reset({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    }
    if (userInfo) {
      navigate("/dashboard");
    }
  }, [isSuccess, isError, reset,navigate,userInfo]);

  // logging user
  const onSubmit = async (data) => {
    try {
      const res = await login(data).unwrap();
      if (res?.error?.data?.errMsg) {
        return toast.error(res?.error?.data?.errMsg);
      }
      dispatch(setCredentials({ ...res }));
      navigate("/dashboard");
      toast.success('logging successful')
    } catch (err) {
      toast.error(err?.data?.errMsg || err.error);
    }
  };
  return (
    <FormContainer>
      <h1>Sign In</h1>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            {...register("email", {
              required: "email is required",
              maxLength: {
                value: 60,
                message: "email must be less than 60 characters",
              },
            })}
            placeholder="Enter email"
          ></Form.Control>
          {errors.email && (
            <p role="alert" style={{ color: "red" }}>
              {errors.email.message}
            </p>
          )}
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            {...register("password", {
              required: "password is required",
              maxLength: {
                value: 20,
                message: "password must be less than 20 characters",
              },
            })}
            placeholder="Enter password"
          ></Form.Control>
          {errors.password && (
            <p role="alert" style={{ color: "red" }}>
              {errors.password.message}
            </p>
          )}
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          {isLoading ? (
            <Loader />
          ) : (
            <span style={{ fontSize: "20px" }}>Login</span>
          )}
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          New Customer? <Link to="/register">Register</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default Login;
