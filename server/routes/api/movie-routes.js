const router = require('express').Router();
const {
  getMovies,
  testMovies
} = require('../../controllers/movie-controller');

router.route('/movies/:movieName').get(getMovies);
router.route('/movies').get(testMovies);

module.exports = router;
