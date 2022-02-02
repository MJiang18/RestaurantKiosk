const express = require('express');
const router = express.Router();
const {
  signUp,
  signIn,
  // logOut,
  // getAllUsers,
  // deleteUser,
} = require('../controllers/auth');

router.route('/signup').post(signUp);
router.route('/signin').post(signIn);
// router.route('/logOut').post(logOut);
// router.route('/users').get(getAllUsers);
// router.route('/user/:userid').delete(deleteUser);

// const { authenticate } = require('../config/jwt.config');

// module.exports = function (app) {
//   app.post('/signup', AuthController.signUp);
//   app.post('/signIn', AuthController.signIn);
//   app.get('/users', AuthController.getAllUsers);
//   app.delete('/user/:userid', AuthController.deleteUser);
// };

module.exports = router;
