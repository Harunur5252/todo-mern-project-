import { Form } from 'react-bootstrap';

function SearchForm({ search, setSearch }) {
  return (
    <Form className="d-flex mt-3" style={{ margin: "0 auto", width: "20rem" }}>
      <Form.Control
        type="search"
        placeholder="Search Todo"
        className="me-2"
        aria-label="Search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </Form>
  );
}

export default SearchForm;