import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setUser } from '../../actions/actions';

import { useState } from 'react';
import { AiFillStar } from "react-icons/ai";
import { AiOutlineStar } from "react-icons/ai";
import './favorite-panel.scss';

import { useState } from 'react';

const mapStateToProps = (state) =>{
  const { user } = state;
  return { user };
}

const toggleFavorite = (props, isFavorite, setFavorite) => {  
  if(isFavorite){
    setFavorite(false);
    removeFavorite(props, setFavorite);
  } else{
    addFavorite(props, setFavorite);
  }
}

const addFavorite = (props, setFavorite) =>{    
  let token = localStorage.getItem('token');    
  let userName = localStorage.getItem('user');
  let axiosConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  
  axios.post('https://cinefacts-api.herokuapp.com/users/' + userName + '/movies/' + props.movieId, null, axiosConfig)
  .then(response => {
    setFavorite(true);
    props.setUser(response.data);    
  })
  .catch(function (error) {
    console.log(error);
  });
}

const removeFavorite = (props, setFavorite) =>{
  let token = localStorage.getItem('token');    
  let userName = localStorage.getItem('user');
  let axiosConfig = {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  };
  
  axios.delete('https://cinefacts-api.herokuapp.com/users/' + userName + '/movies/' + props.movieId, axiosConfig)
  .then(response => {
    setFavorite(false)
    props.setUser(response.data); 
  })
  .catch(function (error) {
    console.log(error);
  });
}

const FavoritePanel = (props) => {  
  const [isFavorite, setFavorite] = useState(props.user.FavoriteMovies.includes(props.movieId));

  return ( 
    <div >
      <div onClick = {() => {toggleFavorite(props, isFavorite, setFavorite)}} className = "main-button">        
        {isFavorite ? 
        <AiFillStar className="star" /> 
        : <AiOutlineStar  className="star" />
        }        
      </div>
    </div>
  );
}

FavoritePanel.propTypes = {
  movieId: PropTypes.string.isRequired
};

export default connect(mapStateToProps, {setUser})(FavoritePanel);
