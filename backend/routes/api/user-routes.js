const router = require('express').Router();
const {
  createUser,
  getSingleUser,
  saveMovie,
  deleteMovie,
  editMovie,
  login
} = require('../../controllers/user-controller');

const { authMiddleware } = require('../../utils/auth');

router.route('/').post(createUser).put(authMiddleware, saveMovie);

router.route('/login').post(login);

router.route('/me').get(authMiddleware, getSingleUser);

router.route('/movies/:movieId').delete(authMiddleware, deleteMovie);

router.route('/movies').put(authMiddleware, editMovie);

module.exports = router;
