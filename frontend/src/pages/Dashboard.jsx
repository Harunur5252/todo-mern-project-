import FormContainer from "../component/FormContainer";
import { Button, Card, ListGroup } from "react-bootstrap";
import { useGetUserQuery } from "../slices/userApiSlice";
import Loader from "../component/Loader";
import { Link } from "react-router-dom";
function Dashboard() {
  const { data, isLoading } = useGetUserQuery();
  return (
    <FormContainer>
      <h1>Dashboard</h1>
      <Card style={{ width: "100%" }}>
        <Card.Img
          variant="top"
          src="https://th.bing.com/th/id/R.1e2636792784ba0d21af371fa1ba7954?rik=qiN0qJsS%2f420Iw&pid=ImgRaw&r=0"
        />
        <Card.Body>
          <Card.Title>User information&apos;s</Card.Title>
        </Card.Body>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <ListGroup className="list-group-flush">
              <ListGroup.Item>Name : {data?.name}</ListGroup.Item>
              <ListGroup.Item>Email : {data?.email}</ListGroup.Item>
              <Link to="/update-profile" className="mt-2">
                <Button type="button">UpdateProfile</Button>
              </Link>
              <Link to="/get-user-todos" className="mt-2">
                <Button type="button">GetUserTodos</Button>
              </Link>
            </ListGroup>
          </>
        )}
      </Card>
    </FormContainer>
  );
}

export default Dashboard;
