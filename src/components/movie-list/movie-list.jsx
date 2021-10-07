import React from 'react';
import Col from 'react-bootstrap/Col';
import { propTypes } from 'react-bootstrap/esm/Image';
import { connect } from 'react-redux';

import MovieCard from '../movie-card/movie-card';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

const mapStateToProps = state => {  
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MovieList(props) {
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;  

  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }
  
  if (!movies) return <div className="main-view"/>;

  return <>
    <Col md={12}>
      <VisibilityFilterInput visibilityFilter={visibilityFilter} />
    </Col>
    {filteredMovies.map(m => (
      <Col md={3} key={m._id}>
        <MovieCard movie={m} />
      </Col>
    ))}
  </>;
}

export default connect(mapStateToProps)(MovieList);