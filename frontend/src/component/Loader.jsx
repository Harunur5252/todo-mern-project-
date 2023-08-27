import { Spinner } from "react-bootstrap";

const Loader = ({width="20px",height="20px",size="md",fontSize="20px"}) => {
  return (
    <>
      <Spinner
        as="span"
        animation="border"
        size={size}
        role="status"
        aria-hidden="true"
        style={{
        width,
        height,
        margin: "auto",
        display: "inline-block",
      }}
      />
      <span style={{fontSize}}> Loading...</span>
    </>
  );
};

export default Loader;
