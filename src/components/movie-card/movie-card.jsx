import React from 'react';
import PropTypes from 'prop-types';
import FavoritePanel from '../favorite-panel/favorite-panel';

import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card.scss';

export default class MovieCard extends React.Component {  

  render() {
    const { movie } = this.props;
    return <>   
      <Card className="movie-card" onClick={this.onCardClick}>
        <FavoritePanel movieId = {movie._id}/>
        <Link to={`/movies/${movie._id}`} className="link">        
        <Card.Img variant="top" src={movie.ImageURL} crossOrigin="anonymous" />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
        </Card.Body>
        </Link> 
      </Card>
    </>
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired
  }).isRequired
};