import { Container ,Card, Button} from "react-bootstrap";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className=" py-5">
      <Container className="d-flex justify-content-center">
        <Card className="p-5 d-flex flex-column align-items-center hero-card bg-light w-75">
          <h1 className="text-center mb-4">404 Not Found</h1>
          <Link to='/'>
            <Button type="button">Go Back</Button>
          </Link>
        </Card>
      </Container>
    </div>
  );
}

export default NotFound