import React from 'react';
import PropTypes from 'prop-types';
import Card from 'react-bootstrap/Card';
import MovieCardSmall from '../movie-card-small/movie-card-small';

import Button from 'react-bootstrap/Button';
import { Col, Row } from 'react-bootstrap';

export default function GenreView(props){

  return (
    <>
      <Card className="main">
        <Card.Body>
          <Card.Title>{props.genre.Name}</Card.Title>                  
          <Card.Text>{props.genre.Description}</Card.Text>
          <Button variant="primary" size="sm" onClick= {props.onBackClick}>Back</Button>
        </Card.Body>
      </Card>

      {props.movies.length > 0 ?   
      <Row>
      {props.movies.map(m => (
        <Col md={4} key={m._id}>
          <MovieCardSmall movie={m} />
        </Col>
      ))}
      </Row>       
      : "no movies"}
    </>
  );
}

GenreView.prototypes = {
  genre: PropTypes.shape({
    Name: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired
  }).isRequired,
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
  onBackClick: PropTypes.func.isRequired
}