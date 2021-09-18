import React from 'react';
import axios from 'axios';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import RegistrationView from '../registration-view/registration-view';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import './main-view.scss';

export default class MainView extends React.Component {  
  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    }
  }

  componentDidMount() {
    //check to see if there's a token in local storge
    let accessToken = localStorage.getItem('token');    
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios.get('https://cinefacts-api.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }
  onRegister(user, password) {  
    //to do: redirect to login or auto log in with register credentials
    console.log("Try Register: "+ user +" "+password);
    this.onLoggedIn(user);  
  }
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });
  
    //store token and user in local storage
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  render() {   

    const {movies, selectedMovie, user} = this.state;

    if (!user) return <Row className="main-view justify-content-md-center">    
      <Col md={3}>
        <LoginView onLoggedIn={newUser => this.onLoggedIn(newUser)} />  
      </Col>
      <Col md={3}>
        <RegistrationView onRegister={(user, password) => this.onRegister(user, password)} />
      </Col>
    </Row>;

    if (movies.length === 0) 
      return <div className="main-view">The list is empty!</div>;
    
    return (
      <Row className="main-view justify-content-md-center">
        <Button onClick={() => { this.onLoggedOut() }}>Logout</Button>
        {selectedMovie
          ? (
          <Col md={8}>
            <MovieView className='mt-5' movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
          </Col>
          )
          : movies.map(movie => (
              <Col md={3} key={movie._id} >
                <MovieCard movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              </Col>
            )
          )
        }
      </Row>
    );  
  }
}