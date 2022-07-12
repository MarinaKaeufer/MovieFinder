const router = require('express').Router();
const {
  getMovies
} = require('../../controllers/movie-controller');

router.route('/movie/:movieName').get(getMovies);

module.exports = router;
