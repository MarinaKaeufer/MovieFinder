import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';

import Auth from '../utils/auth';
import { saveMovie, searchMovies } from '../utils/API';
import { saveMovieIds, getSavedMovieIds } from '../utils/localStorage';

const SearchMovies = () => {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());

  useEffect(() => {
    return () => saveMovieIds(savedMovieIds);
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }

    try {
      const items = await searchMovies(searchInput);

      const baseImageUrl = 'https://image.tmdb.org/t/p/original';

      const movieData = items.map((movie) => ({
        movieId: movie.id,
        title: movie.title,
        description: movie.overview,
        image: `${baseImageUrl}/${movie.poster_path}` ,
      }));

      setSearchedMovies(movieData);
      setSearchInput('');
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a movie to our database
  const handleSaveMovie = async (movieId) => {
    // find the movie in `searchedMovies` state by the matching id
    const movieToSave = searchedMovies.find((movie) => movie.movieId === movieId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await saveMovie(movieToSave, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      // if movie successfully saves to user's account, save movie id to state
      setSavedMovieIds([...savedMovieIds, movieToSave.movieId]);
    } catch (err) {
      console.error(err);
    }
  };

  return ( 
    <> 
      <Jumbotron fluid className='text-dark bg-light' style={{ 
        backgroundImage: `url("movies.jpg")` 
      }}>
        <Container>
          <span className="movieTitle">Movies!</span>
          <Form onSubmit={handleFormSubmit}>
            
              
                <Form.Control
                  size='lg'
                  type='text'
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder='Type in a Movie name...'
                />
              
              
                <Button className="searchButton" type='submit' variant='success' size='lg'>
                  Search
                </Button>
              
            
          </Form>
        </Container>
      </Jumbotron>

      <Container>
        <h2>
          {searchedMovies.length
            ? `Viewing ${searchedMovies.length} results:`
            : 'Search for a movie to begin'}
        </h2>


        <div class="card-columns">
          {searchedMovies.map((movie) => {
            return (

              <div class="card" key={movie.movieId}>
                {movie.image ? (
                <img class="card-img-top" src={movie.image} alt={`The cover for ${movie.title}`} />
                ) : null }
                <div class="card-body">
                  <h5 class="card-title">{movie.title}</h5>
                  <p class="card-text">{movie.description}</p>
                </div>
                {Auth.loggedIn() && (
                    <Button
                      disabled={savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)}
                      className='btn-block btn-info'
                      onClick={() => handleSaveMovie(movie.movieId)}>
                      {savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)
                        ? 'This movie has already been saved!'
                        : 'Save this Movie!'}
                    </Button>
                  )}
                <div class="card-footer">
                  <small class="text-muted">This feature has not been rated yet...</small>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </>
  );
};

export default SearchMovies;
