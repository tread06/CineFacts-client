import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './login-view.scss';

export default function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {    
    e.preventDefault();
    axios.post('https://cinefacts-api.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {         
      props.onLoggedIn(response.data);
    })
    .catch(e => {
      console.log(e);
    });
  };

  return (
    <Form className="main-form">
      <h3>Login</h3>
      <Form.Group controlId="loginFormUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="loginFormPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      <br></br>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Login
      </Button>
    </Form>
  );
}

LoginView.propTypes = {
  onLoggedIn: PropTypes.func.isRequired
};
