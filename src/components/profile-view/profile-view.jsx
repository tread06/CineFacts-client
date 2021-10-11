import React from 'react';
import PropTypes, { instanceOf, string } from 'prop-types';
import './profile-view.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCardSmall from '../movie-card-small/movie-card-small';

import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';
import { Card } from 'react-bootstrap';

const mapStateToProps = state => {
  const { user, movies } = state;
  return { user, movies };
};

function ProfileView(props) { 

  const { user, movies } = props;

  //form state
  const [ errors, setErrors ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ passwordConfirm, setPasswordConfirm ] = useState('');
  const [ email, setEmail ] = useState(props.user.Email);
  const [ birthday, setBirthday ] = useState(new Date(props.user.Birthday).toISOString().substr(0,10)); 

  //show favorite movies
  const movieList = () => {    
    let favorites = [];
    movies.forEach(m => {
      user.FavoriteMovies.forEach(f => {
        if(m._id === f){
          favorites.push(m);
        }
      });
    });
    return favorites;
  }

  const handleSubmitUpdate = (e) => {   
    e.preventDefault();


    //validate
    let errors = {}  
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



    const token = localStorage.getItem('token');
    axios.put('https://cinefacts-api.herokuapp.com/users/' + props.user.Username, {
      Username: props.user.Username,
      Password: password,
      Email: email,
      Birthday: birthday
    },
    {
      headers: {
      Authorization: `Bearer ${token}`
    }
    })
    .then(response => {
      props.onProfileUpdated(response.data);
      }) 
    .catch(function (error) {
      console.log(error);
    });      
  };

  const handleSubmitDelete = (e) => { 
    e.preventDefault();
    const token = localStorage.getItem('token');    
    let axiosConfig = {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    };
    
    axios.delete('https://cinefacts-api.herokuapp.com/users/' + props.user.Username, axiosConfig)
    .then(response => {
      console.log("User Deleted"); 
      props.onProfileDeleted();  
    })
    .catch(function (error) {
      console.log(error);
    });  
  };
  
  return (<>
  <Card className="profile-card">
    <Form className="form">
      <h3>{props.user.Username}</h3>
      <br></br>
      <Form.Group controlId="registrationFormEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control 
          type="email" 
          onChange={e => setEmail(e.target.value)}
          defaultValue={email}/>
        {errors.email && <p className="error">{errors.email}</p>}
      </Form.Group>

      <Form.Group controlId="registrationFormPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control 
        type="password" 
        onChange={e => setPassword(e.target.value)}/>
        {errors.password && <p className="error">{errors.password}</p>}
      </Form.Group>

      <Form.Group controlId="registrationFormPasswordConfirm">
        <Form.Label>Confirm Password:</Form.Label>
        <Form.Control 
        type="password" 
        onChange={e => setPasswordConfirm(e.target.value)}/>
        {errors.passwordConfirm && <p className="error">{errors.passwordConfirm}</p>}
      </Form.Group>

      <Form.Group controlId="registrationFormBirthday">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control 
        type="date" 
        onChange={e => setBirthday(e.target.value)}
        defaultValue={birthday}
        />
      </Form.Group>

      <br></br>
      <Button 
      variant="primary" 
      type="submit" 
      onClick={handleSubmitUpdate}>
      Update User</Button>

      <Button 
      className="delete-button"
      variant="danger" 
      type="submit" 
      onClick={handleSubmitDelete}>
      Delete User</Button>

    </Form>    
  </Card>


  {props.user.FavoriteMovies.length > 0 ? <>
      <h3 className="favorites-label">Favorite Movies</h3>
      <Row>
        {movieList().map(m => (
          <Col md={4} key={m._id}>
            <MovieCardSmall movie={m} />
          </Col>
        ))}
      </Row>  
    </>
    : <></>}
  </>

  );
}

export default connect(mapStateToProps)(ProfileView);