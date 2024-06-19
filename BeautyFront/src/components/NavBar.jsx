import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { logout } from "../utils/auth/authenticate";

import { useEffect, useState, useContext } from "react";
import { StateContext } from "../utils/StateContext";
function NavBar() {
  const {navUpdate, setNavUpdate} = useContext(StateContext);
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();
  const navHandler1 = () => {
    navigate("/");
  };
  const navHandler2 = () => {
    navigate("/create");
  };

  const navButtonHandler = () => {
    navigate("/login");
  };

  const LogOutHandler = async () => {
    await logout();
    setNavUpdate((navUpdate) => navUpdate + 1);
  };

  useEffect(() => {
    const userToken = localStorage.getItem("user");
    if (userToken === null) {
      setShowLogout(false);
    } else {
      setShowLogout(true);
    }
  }, [navUpdate]);
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Nav className="me-auto">
            <Nav.Link onClick={() => navHandler1()}>Home</Nav.Link>
            <Nav.Link onClick={() => navHandler2()}>Create</Nav.Link>
            {showLogout ? (
              <Button  className="logout" id="logout" variant="primary" onClick={LogOutHandler}>
                Log Out
              </Button>
            ) : null}
            { !showLogout && <Button  className ="logout" id="logout" variant="primary" onClick={navButtonHandler}>
              Log in
            </Button>}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
