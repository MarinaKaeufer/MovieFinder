import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, CardColumns, Card, Button, Form } from 'react-bootstrap';

import { getMe, deleteMovie } from '../utils/API';
import Auth from '../utils/auth';
import { removeMovieId } from '../utils/localStorage';

const SavedMovies = () => {
  const [movieNotes, setMovieNotes] = useState([]);
  const [userData, setUserData] = useState({});
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    const getUserData = async () => {
      try {
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
          return false;
        }

        const response = await getMe(token);

        if (!response.ok) {
          throw new Error('something went wrong!');
        }

        const user = await response.json();
        setUserData(user);
        populateMovieNotes(user);
      } catch (err) {
        console.error(err);
      }
    };

    getUserData();
  }, [userDataLength]);

  const populateMovieNotes = (user) => {
    const newMovieNotes = user.savedMovies.map(movie => {
      return { id: movie.id, note: movie.notes };
    });
    setMovieNotes(newMovieNotes);
  }

  const handleDeleteMovie = async (movieId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const response = await deleteMovie(movieId, token);

      if (!response.ok) {
        throw new Error('something went wrong!');
      }

      const updatedUser = await response.json();
      setUserData(updatedUser);
      removeMovieId(movieId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    this.setState({value: event.target.value});
  }

  const handleEditMovie = async (movieId) => {
    // const token = Auth.loggedIn() ? Auth.getToken() : null;

    // if (!token) {
    //   return false;
    // }

    // try {
    //   const response = await editMovie(movieId, notes, token);

    //   if (!response.ok) {
    //     throw new Error('something went wrong!');
    //   }

    //   const updatedUser = await response.json();
    //   setUserData(updatedUser);
    //   removeMovieId(movieId);
    // } catch (err) {
    //   console.error(err);
    // }
  };

  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <Jumbotron fluid className='text-light bg-dark'>
        <Container>
          <h1>Viewing saved movies!</h1>
        </Container>
      </Jumbotron>
      <Container>
        <h2>
          {userData.savedMovies.length
            ? `Viewing ${userData.savedMovies.length} saved ${userData.savedMovies.length === 1 ? 'movie' : 'movies'}:`
            : 'You have no saved movies!'}
        </h2>
        <CardColumns>
          {userData.savedMovies.map((movie) => {
            // console.log(`Notes: ${movie.notes}`);
            // console.log(`Notes: ${movie.notes}`);
            const notes = movieNotes.find(movieCandidate =>{ return movieCandidate.id === movie.movieId } )
            return (
              <Card key={movie.movieId} border='dark'>
                {movie.image ? <Card.Img src={movie.image} alt={`The cover for ${movie.title}`} variant='top' /> : null}
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <p className='small'>Link: {movie.link}</p>
                  <Card.Text>{movie.description}</Card.Text>
                  <div>
                    <Form.Label>Notes</Form.Label>
                    <textarea value={movie.notes} rows={3}  />
                    <Button id="editButton" className='btn-block' onClick={() => handleEditMovie(movie.movieId)}>Edit Notes</Button>
                  </div>
                  <Button id="deleteButton" className='btn-block btn-danger' onClick={() => handleDeleteMovie(movie.movieId)}>
                    Delete this Movie!
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </CardColumns>
      </Container>
    </>
  );
};

export default SavedMovies;
