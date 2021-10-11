import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Link } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import './movie-view.scss';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';

export default class MovieView extends React.Component {

  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    this.state = { isFavorite: props.isFavorite };
  }

  addFavorite = () =>{    
      let token = localStorage.getItem('token');    
      let userName = localStorage.getItem('user');
  
      let axiosConfig = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      
      axios.post('https://cinefacts-api.herokuapp.com/users/' + userName + '/movies/' + this.props.movie._id, null, axiosConfig)
      .then(response => {         
        this.setState({
          isFavorite: true
        })        
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  removeFavorite = () =>{
    let token = localStorage.getItem('token');    
      let userName = localStorage.getItem('user');
  
      let axiosConfig = {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      };
      
      axios.delete('https://cinefacts-api.herokuapp.com/users/' + userName + '/movies/' + this.props.movie._id, axiosConfig)
      .then(response => {
        console.log("Movie deleted from favorites"); 
        this.setState({
          isFavorite: false
        })  
      })
      .catch(function (error) {
        console.log(error);
      });
    
  }
  

  render() {
    const { movie, onBackClick} = this.props;   

    return (      
      <div className = "main">
      <Row className="main-view justify-content-md-center h-100">
        <Col xs={12} md={6}>
        <div className="movie-poster">
          <img className="movie-poster-img" src={movie.ImageURL} crossOrigin="anonymous"/>
        </div>
        </Col>
        <Col>
        <div className="movie-info">
          <div className="movie-title">
            <h2 className="value">{movie.Title}</h2>
          </div>

          <div className = "break"></div><br></br>

          <div className="movie-description">
            <p className="value">{movie.Description}</p>
          </div>

          <div className="movie-director">
            <span className="value">{"Director:"}</span>
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="link">{movie.Director.Name}</Button>
            </Link>
          </div> 

          <div className="movie-genre">
            <span className="value">{"Genre:"}</span>
            <Link to={`/genre/${movie.Genre.Name}`}>
              <Button variant="link">{movie.Genre.Name}</Button>
            </Link>
          </div>  

          <div className = "break"></div><br></br>

          <Button className="back-button" variant="primary" size="sm" onClick= {() => {onBackClick(null);}}>Back</Button>         
          
        </div>
        </Col>
      </Row>
      </div>
    );
    
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImageURL: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired
    }).isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired,
      Bio: PropTypes.string.isRequired,
      BirthYear: PropTypes.number,
      DeathYear: PropTypes.number      
    }).isRequired,
  }).isRequired,
  onBackClick: PropTypes.func.isRequired,  
  isFavorite: PropTypes.bool.isRequired
};