import React from 'react';
import { connect } from 'react-redux';
import PropTypes, { instanceOf, string } from 'prop-types';

import { Navbar, Container, NavDropdown, Nav, Dropdown, DropdownButton } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './nav-bar.scss';

const mapStateToProps = state => {
  const { user } = state;
  return { user };
};

const Navigation = (props) => {
  const { user } = props;  
  const { navigation } = props; 

  return (    
    <Navbar className="nav-bar" bg="light" expand="lg" sticky="top" >
      <Container >
        <Navbar.Brand href="/">Cinefacts</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="me-auto">
            <Link to={`/`} className="link"> Movies</Link>
            <Link to={`/about`} className="link"> About</Link>            
          </Nav>
          <Nav>
          {Object.keys(user).length > 0 ? (   

            <DropdownButton id="dropdown-basic-button" title={props.user.Username}>
              <Dropdown.Item onClick={props.navigateToProfile} >Profile</Dropdown.Item>
              <Dropdown.Item onClick={props.onLogout}>Logout</Dropdown.Item>             
            </DropdownButton>
            
          ) : (
            <>
            <Link to={`/`} className="link"> Login</Link>
            <Link to={`/register`} className="link"> Register</Link>
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
    onLogout: PropTypes.func.isRequired,
    navigateToProfile: PropTypes.func.isRequired
};