import React, { useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './registration-view.scss';

export default function RegistrationView(props) {

  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordConfirm, setPasswordConfirm ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');
  const [ errors, setErrors ] = useState({});

  const handleSubmit = (e) => {    
    e.preventDefault();

    //validate
    let errors = {}    
    if(!username.trim()){
      console.log("Username Required");
      errors.username = "Username required";
    }
    if(!password){
      console.log("Password Required");
      errors.password = "Password required";
    }else if(password.length < 6){
      console.log("Password Must be 6 characters long");
      errors.password = "Password must be at least 6 characters";
    }
    if(!passwordConfirm){
      console.log("Confirm Password Required");
      errors.passwordConfirm = "Confirm password required";
    }if(password !== passwordConfirm){
      console.log("Passwords do not match");
      errors.passwordConfirm = "Passwords do not match";
    }
    
    if(!email){
      console.log("Email Required");
      errors.email = "Email Required";
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email) ){
      console.log("Email invalid");
      errors.email = "Email address is invalid";
    }

    setErrors(errors);
    if(Object.keys(errors).length > 0){
      return;
    }

    axios.post('https://cinefacts-api.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab      
    })
    .catch(e => {
      console.log(e);
    });
  };

  return (
    <Form className="main-form">
      <h3>Register</h3>
      <Form.Group controlId="registrationFormEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control type="email" onChange={e => setEmail(e.target.value)} />
        {errors.email && <p className="error">{errors.email}</p>}
      </Form.Group>

      <Form.Group controlId="registrationFormUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
        {errors.username && <p className="error">{errors.username}</p>}
      </Form.Group>

      <Form.Group controlId="registrationFormPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
        {errors.password && <p className="error">{errors.password}</p>}
      </Form.Group>

      <Form.Group controlId="registrationFormPasswordConfirm">
        <Form.Label>Confirm Password:</Form.Label>
        <Form.Control type="password" onChange={e => setPasswordConfirm(e.target.value)} />
        {errors.passwordConfirm && <p className="error">{errors.passwordConfirm}</p>}
      </Form.Group>

      <Form.Group controlId="registrationFormBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control type="date" onChange={e => setBirthday(e.target.value)} />        
      </Form.Group>

      <br></br>
      <Button variant="primary" type="submit" onClick={handleSubmit}>
        Register
      </Button>
      <Link to={`/`} className="link blue"> Login</Link>
    </Form>
  );
}

RegistrationView.propTypes = {
};
