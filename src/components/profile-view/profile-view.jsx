import React from 'react';
import PropTypes, { instanceOf, string } from 'prop-types';
import './profile-view.scss';
import { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from '../movie-card/movie-card';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Row, Col } from 'react-bootstrap';
import { propTypes } from 'react-bootstrap/esm/Image';

export default function ProfileView(props) { 

  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState(props.user.Email);
  const [ birthday, setBirthday ] = useState(new Date(props.user.Birthday).toISOString().substr(0,10)); 
  
  useEffect(() => {    
    console.log(new Date(props.user.Birthday).toISOString().substr(0,10));
    console.log(email);
  }, [email]);  

  movieList = () => {
    //filter movie list
    let favorites = [];
    props.movies.forEach(m => {
      props.user.FavoriteMovies.forEach(f => {
        if(m._id === f){
          favorites.push(m);
        }
      });
    });
    return favorites;    
  }

  const handleSubmitUpdate = (e) => {   
    e.preventDefault();
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
      console.log(response);
      console.log(response.data);
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
    <Form>
      <h3>{props.user.Username}</h3>
      <br></br>
      <Form.Group controlId="registrationFormEmail">
        <Form.Label>Email:</Form.Label>
        <Form.Control 
          type="email" 
          onChange={e => setEmail(e.target.value)}
          defaultValue={email}
        />
      </Form.Group>

      <Form.Group controlId="registrationFormPassword">
        <Form.Label>Password:</Form.Label>
        <Form.Control 
        type="password" 
        onChange={e => setPassword(e.target.value)}/>
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
      variant="danger" 
      type="submit" 
      onClick={handleSubmitDelete}>
      Delete User</Button>

    </Form>
    <br></br>
    <h3>Favorites</h3>
    
    {movieList().length > 0 ?   
      <Row>
        {movieList().map(m => (   
        <Col md={4} key={m._id}>      
          <MovieCard movie={m} />   
        </Col>))}
      </Row>         
      : "No favorite movies have been added yet."}
    </>
  );
}

ProfileView.propTypes = {
  user: PropTypes.shape({
    Username: string.isRequired,
    Email: string.isRequired,
    Birthday: string,
    FavoriteMovies: PropTypes.arrayOf(PropTypes.string).isRequired  
  }),
  movies: PropTypes.arrayOf(PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      BirthYear: PropTypes.number,
      DeathYear: PropTypes.number      
    })})).isRequired,
    onProfileUpdated: PropTypes.func.isRequired,
    onProfileDeleted: PropTypes.func.isRequired
};