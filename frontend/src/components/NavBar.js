import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

function NavBar({ userInfo, handleLogout }) {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand>GreenGoods</Navbar.Brand>
        </LinkContainer>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {userInfo ? (
              <>
                <LinkContainer to="/search"><Nav.Link>Search</Nav.Link></LinkContainer>
                <LinkContainer to="/cart"><Nav.Link>Cart</Nav.Link></LinkContainer>
                <LinkContainer to="/orders"><Nav.Link>Orders</Nav.Link></LinkContainer>
                <LinkContainer to="/profile"><Nav.Link>{userInfo.name}</Nav.Link></LinkContainer>
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              </>
            ) : (
              <>
                <LinkContainer to="/login"><Nav.Link>Login</Nav.Link></LinkContainer>
                <LinkContainer to="/register"><Nav.Link>Register</Nav.Link></LinkContainer>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default NavBar;
