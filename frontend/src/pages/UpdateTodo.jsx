import { useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import FormContainer from "../component/FormContainer";
import Loader from "../component/Loader";

import {
  useGetAllTodoQuery,
  useUpdateTodoMutation,
} from "../slices/todoApiSlice";

function UpdateTodo() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const params = useParams();
  const navigate = useNavigate();
  const [updateTodo, { isLoading }] = useUpdateTodoMutation();
  const { todo } = useGetAllTodoQuery(undefined, {
    selectFromResult: ({ data }) => ({
      todo: data?.find((todo) => todo._id === params.id),
    }),
  });

  const onSubmit = async (data) => {
    const userData = {
      title: data?.title,
      description: data?.description,
      completed: data?.completed,
      id: todo?._id,
    };
    try {
      const res = await updateTodo(userData).unwrap();
      if (res?.error?.data?.errMsg) {
        return toast.error(res?.error?.data?.errMsg);
      }
      navigate(-1);
      toast.success("todo updated successful");
    } catch (err) {
      toast.error(err?.data?.errMsg || err.error);
    }
  };
  return (
    <FormContainer>
      <h1>Update Todo</h1>

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
            defaultValue={todo?.title}
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
            defaultValue={todo?.description}
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
        <Form.Check
          type="switch"
          id="custom-switch"
          defaultChecked={todo?.completed}
          label="complete/incomplete"
          {...register("completed")}
        />

        <Button
          type="submit"
          variant="primary"
          className={isLoading ? "mt-3 disabled" : "mt-3"}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <span style={{ fontSize: "20px" }}>Update Todo</span>
          )}
        </Button>
      </Form>
    </FormContainer>
  );
}

export default UpdateTodo;
