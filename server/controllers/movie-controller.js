// var axios = require('axios');

module.exports = {
  async getMovies({ params }, res) {
    console.log(`getMovies in server...`);
    try {
      // const moviesFound = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=ef26c2932545c6ea6aec330b557546ea&query=${params.movieName}`);
      // console.log(moviesFound.data);
      // res.json(moviesFound);
    } catch (err) {
        // console.error(err);
    }
  },
  async testMovies({ params }, res) {
    console.log(`testMovies in server...`);
    return res.status(400).json({ message: 'test movies end point not a valid end point' });
  }
}