import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';

export default class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    return <Card>
        <Card.Img variant="top" src={movie.ImageURL} crossOrigin="anonymous" />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button className="open-button" size="sm" onClick={() => onMovieClick(movie)} variant="primary">Open</Button>
        </Card.Body>
      </Card>
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};