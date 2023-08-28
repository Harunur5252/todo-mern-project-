import { Container, Card, Button, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Hero from "../component/Hero";
import Todo from "../pages/Todo";
import { useGetAllTodoQuery } from "../slices/todoApiSlice";
import { useState } from "react";

function Home() {
  const { userInfo } = useSelector((state) => state.auth);
  const [searchTodo, setSearchTodo] = useState("pending");
  const getTodo = (search, data) => {
    if (search === "pending") {
      const result = data?.filter((item) => item.completed === false);
      return result ? [...result].reverse() : result;
    }
    if (search === "completed") {
      const result = data?.filter((item) => item.completed === true);
      return result ? [...result].reverse() : result;
    }
    if (search === "allTodo") {
      return data ? [...data].reverse() : data;
    }
  };
  const { todos } = useGetAllTodoQuery(undefined, {
    selectFromResult: ({ data }) => ({
      todos: getTodo(searchTodo, data),
    }),
  });

  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center">
        <Row>
          <Col lg="6" sm="12" md="6">
            <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-100">
              <h1 className="text-center mb-4">MERN Application</h1>
              <h5 className="text-center mb-4">Authentication & Todo curd</h5>
              <p className="text-center mb-4">
                This is a boilerplate for MERN authentication that stores a JWT
                in an HTTP-Only cookie. It also uses Redux Toolkit and the React
                Bootstrap library
              </p>

              {!userInfo && (
                <>
                  <div className="d-flex">
                    <Link to="/login">
                      <Button variant="primary" className="me-3">
                        Sign In
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button variant="secondary">Register</Button>
                    </Link>
                  </div>
                </>
              )}
            </Card>
          </Col>
          <Col lg="6" sm="12" md="6">
            {!userInfo && (
              <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-100">
                <h1 className="text-center mb-4">
                  Please login/register to see todos conditions here.
                </h1>
              </Card>
            )}
            {userInfo && (
              <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-100">
                <Link to="add-todo">
                  <Button type="button">AddTodo</Button>
                </Link>
                <Hero searchTodo={searchTodo} setSearchTodo={setSearchTodo} />
                {todos?.map((todo) => {
                  return <Todo key={todo?._id} todo={todo} />;
                })}
              </Card>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
