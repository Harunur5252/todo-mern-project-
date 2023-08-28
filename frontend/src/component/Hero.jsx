import { Form } from "react-bootstrap";

function Hero({ searchTodo, setSearchTodo }) {
  const handleChanged = (e) => {
    setSearchTodo(e.target.value);
  };
  return (
    <Form className="d-flex mt-3" style={{ margin: "0 auto", width: "20rem" }}>
      <Form.Select
        value={searchTodo}
        onChange={handleChanged}
        aria-label="Default select example"
      >
        <option value="completed">Completed</option>
        <option value="pending">Pending</option>
        <option value="allTodo">AllTodo</option>
      </Form.Select>
    </Form>
  );
}

export default Hero;
