var axios = require('axios');
require('dotenv').config()

module.exports = {
  async getMovies({ params }, res) {
    try {
      const moviesFound = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${params.movieName}`);
      return res.json(moviesFound.data.results);
    } catch (err) {
        console.error(err);
    }
  }
}