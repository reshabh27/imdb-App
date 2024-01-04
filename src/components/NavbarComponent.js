import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/user/userSlice";
import { Button, Container, Dropdown, Image, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";



const NavbarComponent = () => {
  // const cartData = useSelector((state) => state.cartState);
  const user = useSelector((state) => state.userState.user);
  // console.log(user);
  let canAddMovies =0;
  if(user?.role === "Admin")
  {
    canAddMovies=1;
  }

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = () => {
    dispatch(logoutUser());
    navigate("/");
  };

  return (
    <Navbar expand="lg" bg="light" variant="light" className="mb-4">
      <Container>
        <Navbar.Brand as={Link} to="/">
          IMDB Application
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/favorite">
              Favorite
            </Nav.Link>
            {canAddMovies ? (
              <Nav.Link as={Link} to="/addMovies">
                Add movies
              </Nav.Link>
            ) : ""}
          </Nav>
        </Navbar.Collapse>

        <div className="ms-auto d-flex align-items-center">
          {user ? (
            <Dropdown className="ps-3">
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                <Image
                  alt="Profile"
                  src="https://ionicframework.com/docs/img/demos/avatar.svg"
                  width={30}
                  height={30}
                  roundedCircle
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item>Logged in as {user?.name}</Dropdown.Item>
                <Dropdown.Item onClick={handleLogOut}>Logout</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : 
            <Button as={Link} to="/login">Login</Button>
          }
        </div>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
