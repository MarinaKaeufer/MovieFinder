export const getMe = (token) => {
  return fetch('/api/users/me', {
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
  });
};

export const createUser = (userData) => {
  return fetch('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const loginUser = (userData) => {
  return fetch('/api/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
};

export const saveMovie = (movieData, token) => {
  return fetch('/api/users', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(movieData),
  });
};

export const deleteMovie = (movieId, token) => {
  return fetch(`/api/users/movies/${movieId}`, {
    method: 'DELETE',
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const editMovie = (userId, movieData, token) => {
  console.log(` `);
  console.log(`userId ${JSON.stringify(userId)}`);
  console.log(`movieData ${JSON.stringify(movieData)}`);
  return fetch(`/api/users/movies`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({movie: movieData, userId: userId}),
  });
};


export const searchMovies = async (query) => {
  const movies  = await fetch(`/api/movies/movie/${query}`);
  let response = await movies.json();
  return response;
};
