import React, { useState } from 'react';
import PropTypes from 'prop-types';

export default function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleSubmit = (e) => {    
    e.preventDefault();
    props.onRegister(username, password);
  };

  return (
    <form>
      <h4>Register</h4>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="submit" onClick={e => handleSubmit(e)}>Submit</button>
    </form>
  );
}

RegistrationView.propTypes = {
  onRegister: PropTypes.func.isRequired
};
