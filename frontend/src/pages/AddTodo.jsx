import { useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormContainer from "../component/FormContainer";
import Loader from "../component/Loader";
import { useAddTodoMutation } from "../slices/todoApiSlice";

function Login() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [addTodo, { isLoading, isSuccess, isError }] = useAddTodoMutation();

  useEffect(() => {
    if (isSuccess || isError) {
      reset({
        title: "",
        description: "",
      });
    }
  }, [isSuccess, isError, reset]);

  // adding todo
  const onSubmit = async (data) => {
    try {
      const res = await addTodo(data).unwrap();
      if (res?.error?.data?.errMsg) {
        return toast.error(res?.error?.data?.errMsg);
      }
      toast.success("todo added successful");
    } catch (err) {
      toast.error(err?.data?.errMsg || err.error);
    }
  };
  return (
    <FormContainer>
      <h1>Add Todo</h1>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="my-2" controlId="email">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            {...register("title", {
              required: "title is required",
              maxLength: {
                value: 60,
                message: "title must be less than 60 characters",
              },
            })}
            placeholder="Enter title"
          ></Form.Control>
          {errors.title && (
            <p role="alert" style={{ color: "red" }}>
              {errors.title.message}
            </p>
          )}
        </Form.Group>

        <Form.Group className="my-2" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="textarea"
            {...register("description", {
              required: "description is required",
              maxLength: {
                value: 5000,
                message: "description must be less than 5000 characters",
              },
            })}
            placeholder="Enter text"
            as="textarea"
            rows={3}
            cols={3}
          ></Form.Control>
          {errors.description && (
            <p role="alert" style={{ color: "red" }}>
              {errors.description.message}
            </p>
          )}
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className={isLoading ? "mt-3 disabled" : "mt-3"}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <span style={{ fontSize: "20px" }}>Add Todo</span>
          )}
        </Button>
      </Form>
    </FormContainer>
  );
}

export default Login;
