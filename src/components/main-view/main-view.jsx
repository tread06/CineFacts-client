import React from 'react';
import axios from 'axios';

//routing
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

//redux / action
import { connect } from 'react-redux';
import { setMovies } from '../../actions/actions';
import { setUser } from '../../actions/actions';
import MovieList from '../movie-list/movie-list';

//components
import Navigation from '../nav-bar/nav-bar';
import MovieView from '../movie-view/movie-view';
import LoginView from '../login-view/login-view';
import RegistrationView from '../registration-view/registration-view';
import ProfileView from '../profile-view/profile-view';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';

//bootstrap / css
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './main-view.scss';

class MainView extends React.Component {  
  constructor(){
    super(); 
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {    
    
    let accessToken = localStorage.getItem('token');    
    let userName = localStorage.getItem('user');

    if (accessToken !== null) {
      this.getUser(userName, accessToken);     
      this.getMovies(accessToken);
    }    
  }

  getMovies(token) {
    axios.get('https://cinefacts-api.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {      
      this.props.setMovies(response.data);            
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getUser(userName, token) {    
    axios.get('https://cinefacts-api.herokuapp.com/users/' + userName, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.props.setUser(response.data);  
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
  
  onLoggedIn(authData) {
    //store token and user in local storage
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);    
    this.getUser(authData.Username, authData.token);    
    window.open('/', '_self');
  }  

  logout()
  {
    console.log("Logging out");
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.props.setUser({});  
  }

  onUserUpdated(userData){
    this.logout();
  }
  onUserDeleted(){
    this.logout();
  }  

  render() {  
      
    let {movies} = this.props;
    let {user} = this.props;
    let isLoggedIn = Object.keys(user).length > 0;
    
    //to do: nav bar component
    return (<>  
      <Navigation  onLogout ={() => this.logout()} />
      <Router>
        <Row className="main-view justify-content-md-center"> 
          <Route exact path="/" render={() => {            
            if (!isLoggedIn) return <Col md={4}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
            if (movies.length === 0) return <div className="main-view">No movies found.</div>; 
            return <MovieList movies={movies}/>;
          }} />

          <Route path="/register" render={({ match, history }) => {
            if (isLoggedIn) return <Redirect to="/" />
            return <Col md={4}>
              <RegistrationView />
            </Col>
          }} />

          <Route path="/movies/:movieId" render={({ match, history }) => {
            if (!isLoggedIn) return <Col>
            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
            </Col>  
            
            return <Col md={8}>
              <MovieView 
                movie={movies.find(m => m._id === match.params.movieId)} 
                onBackClick={() => history.goBack()}
                onFavoriteClick={(movieId) => this.addFavorite(movieId)} 
                isFavorite = {user.FavoriteMovies.includes(match.params.movieId)}/>
            </Col>
          }} />
          
          <Route path="/profile" render={({ match, history }) => {
            if (!isLoggedIn) return <Col md={4}>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>  
            return <Col md={8}>
              <ProfileView   
                onProfileUpdated = {() => {this.onUserUpdated()}}
                onProfileDeleted = {() => {this.onUserDeleted()}}/>
            </Col>
          }} />

          <Route path="/directors/:name" render={({ match, history }) => {
            if (movies.length === 0) return <div className="main-view" />;
              return <Col md={8}>
                <DirectorView 
                  director={movies.find(m => m.Director.Name === match.params.name).Director} 
                  movies = {movies.filter(m => m.Director.Name === match.params.name)}
                  onBackClick={() => history.goBack()} />
              </Col>
          }} />

          <Route path="/genre/:name" render={({ match, history }) => {
            if (movies.length === 0) return <div className="genre-view" />;
              return <Col md={8}>
                <GenreView 
                genre={movies.find(m => m.Genre.Name === match.params.name).Genre} 
                movies = {movies.filter(m => m.Genre.Name === match.params.name)}
                onBackClick={() => history.goBack()} />
              </Col>
          }} />
        </Row>
      </Router>
      </>
    );  
  }
}

//create props for this component from the state
let mapStateToProps = state => {  
  return { movies: state.movies, user: state.user }
}

//export the component class with redux store connection
export default connect(mapStateToProps, { setMovies, setUser } )(MainView);
//export default connect(functionType, { list of actions to bind } )(MainView);