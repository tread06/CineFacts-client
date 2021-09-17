import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import './registration-view.scss';

export default function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {    
    e.preventDefault();
    props.onRegister(username, password);
  };

  return (
    <Form>
      <Form.Group controlId="registrationFormUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
      </Form.Group>

      <Form.Group controlId="registrationFormPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
      </Form.Group>
      
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Register
      </Button>
    </Form>
  );
}

RegistrationView.propTypes = {
  onRegister: PropTypes.func.isRequired
};
