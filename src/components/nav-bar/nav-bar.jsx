import React from 'react';
import { connect } from 'react-redux';
import PropTypes, { instanceOf, string } from 'prop-types';

import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';

import './nav-bar.scss';

const mapStateToProps = state => {
  const { user } = state;
  return { user };
};

const Navigation = (props) => {
  const { user } = props;
  return (    
    <Navbar bg="light" expand="lg" sticky="top" >
      <Container >
        <Navbar.Brand href="/">Cinefacts</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="me-auto">
            <Nav.Link href="/">Movies</Nav.Link>
            <Nav.Link href="/about">About</Nav.Link>              
          </Nav>
          <Nav>
          {Object.keys(user).length > 0 ? (              
            <NavDropdown title={props.user.Username} id="basic-nav-dropdown" >
              <NavDropdown.Item href={"/profile"}>Profile</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={props.onLogout}>Logout</NavDropdown.Item>
            </NavDropdown>
          ) : (
            <>
            <Nav.Link href="/">Login</Nav.Link>
            <Nav.Link href="/register">Register</Nav.Link>
            </>
          )}  
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default connect(mapStateToProps)(Navigation);

Navigation.propTypes = {
    onLogout: PropTypes.func.isRequired
};
