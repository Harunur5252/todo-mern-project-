import { Spinner } from "react-bootstrap";

const Loader = ({
  width = "20px",
  variant = "danger",
  height = "20px",
  size = "md",
  fontSize = "20px",
  color,
}) => {
  return (
    <>
      <Spinner
        as="span"
        animation="border"
        variant={variant}
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
      <span style={{ fontSize, color }}> Loading...</span>
    </>
  );
};

export default Loader;
