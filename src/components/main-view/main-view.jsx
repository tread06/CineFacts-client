import React from 'react';
import axios from 'axios';
import MovieCard from '../movie-card/movie-card';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import RegistrationView from '../registration-view/registration-view';

export default class MainView extends React.Component {  
  constructor(){
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      user: null
    }
  }

  componentDidMount(){
    //to do: remove authentification for testing
    axios.get('https://cinefacts-api.herokuapp.com/movies')
      .then(response => {
        this.setState({
          movies: response.data
        });        
      })
      .catch(error => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  onLoggedIn(newUser) {
    this.setState({
      user: newUser
    });
  }

  onRegister(user, password) {  
    console.log("Try Register: "+ user +" "+password);
    this.onLoggedIn(user);
  
  }

  render() {   

    const {movies, selectedMovie, user} = this.state;

    if (!user) return <>
    <LoginView onLoggedIn={newUser => this.onLoggedIn(newUser)} />
    <RegistrationView onRegister={(user, password) => this.onRegister(user, password)} />
    </>;

    if (movies.length === 0) 
      return <div className="main-view">The list is empty!</div>;
    
    return (
      <div className="main-view">
        {selectedMovie
          ? <MovieView movie={selectedMovie} onBackClick={(newSelectedMovie) => { this.setSelectedMovie(newSelectedMovie); }}/>
          : movies.map(movie => (
            <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
          ))
        }
      </div>
    );  
  }
}