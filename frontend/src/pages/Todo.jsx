import { toast } from "react-toastify";
import { useDeleteTodoMutation } from "../slices/todoApiSlice";
import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import Loader from "../component/Loader";
import { Link } from "react-router-dom";

function Todo({ todo }) {
  const { userInfo } = useSelector((state) => state.auth);
  const [deleteTodo, { isLoading }] = useDeleteTodoMutation();
  const handleDelete = async (id) => {
    try {
      const res = await deleteTodo(id).unwrap();
      if (res?.error?.data?.errMsg) {
        return toast.error(res?.error?.data?.errMsg);
      }
      toast.success("todo deleted successfully!");
    } catch (err) {
      toast.error(err?.data?.errMsg);
    }
  };

  return (
    <Card style={{ width: "20rem", margin: "0 auto", marginTop: "1rem" }}>
      <Card.Body>
        <Card.Title>{todo?.title}</Card.Title>
        <Card.Text>{todo?.description}</Card.Text>
        {userInfo?._id === todo?.user && (
          <>
            <Link to={`/update-todo/${todo?._id}`}>
              <Button variant="success">Update</Button>
            </Link>
            &nbsp;&nbsp;
            <Button
              onClick={() => handleDelete(todo?._id)}
              variant="danger"
              className={isLoading && "disabled"}
            >
              {isLoading ? <Loader /> : <span>Delete</span>}
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
}

export default Todo;
