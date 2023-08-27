import { Button, Container, Form, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../slices/authSlice";
import { toast } from "react-toastify";
import { useLogoutUserMutation } from "../slices/userApiSlice";
import { todoApiSlice } from "../slices/todoApiSlice";

function Header() {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logoutUser] = useLogoutUserMutation();
  const handleLogout = async () => {
    try {
      const res = await logoutUser().unwrap();
      dispatch(logout());
      dispatch(todoApiSlice.util.resetApiState());
      navigate("/login");
      toast.success(res?.message);
    } catch (err) {
      toast.error(err?.data?.errMsg || err.error);
      console.error(err);
    }
  };
  return (
    <header>
      <Navbar
        expand="lg"
        bg="dark"
        data-bs-theme="dark"
        className="bg-body-tertiary"
      >
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto">
              <NavLink className="nav-link" to="/">
                Home
              </NavLink>
              {!userInfo && (
                <>
                  <NavLink className="nav-link" to="/register">
                    Register
                  </NavLink>
                  <NavLink className="nav-link" to="/login">
                    Login
                  </NavLink>
                </>
              )}
              {userInfo && (
                <NavLink className="nav-link" to="/dashboard">
                  Dashboard
                </NavLink>
              )}
              {userInfo && (
                <NavLink className="nav-link" to="/add-todo">
                  AddTodo
                </NavLink>
              )}
              {userInfo && (
                <NavLink className="nav-link" to="/all-todo">
                  AllTodo
                </NavLink>
              )}

              {userInfo && (
                <NavDropdown title={userInfo?.name} id="basic-nav-dropdown">
                  <NavDropdown.Item>
                    <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
            
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
