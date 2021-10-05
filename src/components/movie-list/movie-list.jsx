import React from 'react';
import Col from 'react-bootstrap/Col';
import { connect } from 'react-redux';

import MovieCard from '../movie-card/movie-card';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

const mapStateToProps = state => {

  //destructure the visibility filter from the state to assign it to the props
  //to do --- use a string array instead
  const { visibilityFilter } = state;
  return { visibilityFilter };
};

function MovieList(props) {

  //movies in props comes from that passed props
  //visibilityFilter in props comes from mapStateToProps
  const { movies, visibilityFilter } = props;
  let filteredMovies = movies;

  //filter movies by the visibility filter
  //to do: use a string array of movie IDs instead
  if (visibilityFilter !== '') {
    filteredMovies = movies.filter(m => m.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  if (!movies) return <div className="main-view"/>;

  return <>
    <Col md={12} style={{ margin: '1em' }}>
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