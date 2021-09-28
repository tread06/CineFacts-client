import React from 'react';
import PropTypes from 'prop-types';
import './profile-view.scss';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function ProfileView(props) { 

  return (    
    <Form>
      <h3>Profile Information</h3>
      <Form.Group controlId="registrationFormEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" onChange={e => setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="registrationFormUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="registrationFormPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="registrationFormBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control type="date" onChange={e => setBirthday(e.target.value)} />
      </Form.Group>

      <br></br>
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
  );
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    Username: PropTypes.string.isRequired,
    Birthday: PropTypes.instanceOf(Date),
    Email: PropTypes.string.isRequired,
    FavoriteMovies: PropTypes.arrayOf(
      PropTypes.string
    ).isRequired  
})};