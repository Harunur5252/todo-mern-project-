import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormContainer from "../component/FormContainer";
import { useDispatch } from "react-redux";
import { useLogoutUserMutation, useUpdateUserMutation } from "../slices/userApiSlice";
import { logout, setCredentials, setCredentialsUpdate } from "../slices/authSlice";
import Loader from "../component/Loader";

function UpdateUserProfile() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [logoutUser] = useLogoutUserMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const res = await updateUser(data).unwrap();
      if (res?.error?.data?.errMsg) {
        return toast.error(res?.error?.data?.errMsg);
      }
      dispatch(setCredentials({ ...res }));
      const logoutResponse = await logoutUser().unwrap(); 
      dispatch(logout());
      navigate("/login");
      toast.success(
        `${logoutResponse?.message} and login with updated email and password`
      );
    } catch (err) {
      toast.error(err?.data?.errMsg || err.error);
    }
  };
  return (
    <FormContainer>
      <h1>Update Profile</h1>
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
            placeholder="Enter new name"
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
                value: 20,
                message: "email must be less than 20 characters",
              },
            })}
            placeholder="Enter new email"
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
            placeholder="Enter new password"
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
            <span style={{ fontSize: "20px" }}>UpdateProfile</span>
          )}
        </Button>
      </Form>
    </FormContainer>
  );
}

export default UpdateUserProfile;
