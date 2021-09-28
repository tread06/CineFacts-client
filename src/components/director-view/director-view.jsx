import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import MovieCard from '../movie-card/movie-card';

import { useEffect } from 'react';

import Button from 'react-bootstrap/Button';
import { Col, Row } from 'react-bootstrap';

export default function DirectorView(props){

  return (
    <>
      <Card>
        <Card.Body>
          <Card.Title>{props.director.Name}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{ props.director.DeathYear ? 
            props.director.BirthYear + "-" +  props.director.DeathYear
            : "Born: " + props.director.BirthYear} 
          </Card.Subtitle>           
          <Card.Text>{props.director.Bio}</Card.Text>
          <Button variant="primary" size="sm" onClick= {props.onBackClick}>Back</Button>
        </Card.Body>
      </Card>

      {props.movies.length > 0 ?   
      <Row>
        {props.movies.map(m => (   
        <Col md={4} key={m._id}>      
          <MovieCard movie={m} />   
        </Col>))}
      </Row>         
      : "no movies"}

    </>
  );
}

DirectorView.prototype = {
  director: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Bio: PropTypes.string.isRequired,
    BirthYear: PropTypes.number,
    DeathYear: PropTypes.number
  }).isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Genre: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      BirthYear: PropTypes.number,
      DeathYear: PropTypes.number      
    })})).isRequired,
  onBackClick: PropTypes.func.isRequired
}