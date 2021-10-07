import React from 'react';
import PropTypes from 'prop-types';
import FavoritePanel from '../favorite-panel/favorite-panel';

import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import './movie-card-small.scss';

export default class MovieCardSmall extends React.Component { 

  render() {
    const { movie } = this.props;
    return <>
      <Card className="movie-card">
      <FavoritePanel movieId = {movie._id} className = "favorite-panel" />
        <Link to={`/movies/${movie._id}`} className="link">
          <Card.Img variant="top" src={movie.ImageURL} crossOrigin="anonymous" />    
        </Link>       
      </Card>    
    </> 
  }
}

MovieCardSmall.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired
  }).isRequired
};