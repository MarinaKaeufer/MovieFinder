const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  saveMovie,
  deleteMovie,
  login,
  testUser,
} = require('../../controllers/user-controller');

// import middleware
const { authMiddleware } = require('../../utils/auth');

router.route('/test').get(testUser)

// put authMiddleware anywhere we need to send a token for verification of user
router.route('/').post(createUser).put(authMiddleware, saveMovie);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/movies/:movieId').delete(authMiddleware, deleteMovie);

module.exports = router;
