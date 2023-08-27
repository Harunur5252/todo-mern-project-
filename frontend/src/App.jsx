import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import Header from "./component/Header";
import { ToastContainer } from "react-toastify";
function App() {
  return (
    <>
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Container>
        <Outlet />
      </Container>
    </>
  );
}

export default App;
