import React from 'react';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';

export default class MovieCard extends React.Component {  


  onCardClick(){
    console.log("Click");
  }

  render() {
    const { movie } = this.props;
    return <Link to={`/movies/${movie._id}`} className="link">
      <Card className="movie-card" onClick={this.onCardClick}>
        <Card.Img variant="top" src={movie.ImageURL} crossOrigin="anonymous" />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
        </Card.Body>
      </Card>
    </Link>    
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired
  }).isRequired
};