import React from 'react';
import PropTypes from 'prop-types';

import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import './movie-view.scss';

export default class MovieView extends React.Component {

  keypressCallback(event) {
    console.log(event.key);
  }

  componentDidMount(){
    document.addEventListener('keypress', this.keypressCallback);
  }
  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }
  

  render() {
    const { movie, onBackClick } = this.props;    

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img className="movie-poster-img" src={movie.ImageURL} crossOrigin="anonymous"/>
        </div>

        <div className="movie-info">
          <div className="movie-title">
            <h2 className="value">{movie.Title}</h2>
          </div>

          <div className="movie-description">
            <p className="value">{movie.Description}</p>
          </div>

          <div className="movie-director">
            <span className="value">{"Director:"}</span>
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="link">{movie.Director.Name}</Button>
            </Link>
          </div>
          
          {
          //to do: add genre view

          /* <div className="movie-genre">
            <span className="value">{"Genre:"}</span>
            <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre</Button>
          </Link>
          </div> */}         

          <Button variant="primary" size="sm" onClick= {() => {onBackClick(null);}}>Back</Button>
        </div>
      </div>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Genre: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      BirthYear: PropTypes.number,
      DeathYear: PropTypes.number      
    }).isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired
};