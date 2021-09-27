import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './registration-view.scss';

export default function RegistrationView(props) {

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');

  const handleSubmit = (e) => {    
    e.preventDefault();

    axios.post('https://cinefacts-api.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);

      //refresh the page
      window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
      //to do: auto log in
      
    })
    .catch(e => {
      console.log(e);
    });
  };

  return (
    <Form>
      <h3>Register</h3>
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
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Register
      </Button>
    </Form>
  );
}

RegistrationView.propTypes = {
};
