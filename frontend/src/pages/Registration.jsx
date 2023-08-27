import { useEffect, useState } from "react";
import FormContainer from "../component/FormContainer";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../slices/authSlice";
import { useUserRegisterMutation } from "../slices/userApiSlice";
import Loader from "../component/Loader";
import { useForm } from "react-hook-form";

function Registration() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // getting register function for data fetch and more.
  let [userRegister, { isLoading, isSuccess, isError }] = useUserRegisterMutation();

  // after calling register function from this component toolkit gives state data.
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
  }, [isSuccess, isError, reset, userInfo,navigate]);

  // registering new user
  const onSubmit = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("password don't matched");
    } else {
      try {
        const res = await userRegister(data).unwrap();
        if (res?.error?.data?.errMsg) {
          return toast.error(res?.error?.data?.errMsg);
        }
        dispatch(setCredentials({ ...res }));
        navigate("/dashboard");
        toast.success("registration successful");
      } catch (err) {
        toast.error(err?.data?.errMsg || err.error);
      }
    }
  };
  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="my-2" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            {...register("name", {
              required: "name is required",
              maxLength: {
                value: 20,
                message: "name must be less than 20 characters",
              },
            })}
            placeholder="Enter name"
          ></Form.Control>
          {errors.name && (
            <p role="alert" style={{ color: "red" }}>
              {errors.name.message}
            </p>
          )}
        </Form.Group>

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
        <Form.Group className="my-2" controlId="confirmPassword">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            {...register("confirmPassword", {
              required: "confirmPassword is required",
              maxLength: {
                value: 20,
                message: "confirmPassword must be less than 20 characters",
              },
            })}
            placeholder="Confirm password"
          ></Form.Control>
          {errors.confirmPassword && (
            <p role="alert" style={{ color: "red" }}>
              {errors.confirmPassword.message}
            </p>
          )}
        </Form.Group>

        <Button type="submit" variant="primary" className="mt-3">
          {isLoading ? (
            <Loader />
          ) : (
            <span style={{ fontSize: "20px" }}>Register</span>
          )}
        </Button>
      </Form>

      <Row className="py-3">
        <Col>
          Already have an account? <Link to="/login">Login</Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default Registration;
