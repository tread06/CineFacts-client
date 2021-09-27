import React from 'react';
import PropTypes from 'prop-types';
import './profile-view.scss';

export default function ProfileView(props) { 

  return (    
    <div>
      <h3>{props.user}</h3>
    </div>
  );
}

ProfileView.propTypes = {
  user: PropTypes.string.isRequired
};