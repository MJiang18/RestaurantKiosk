const express = require('express');
const router = express.Router();
const {
  signUp,
  signIn,
  // logOut,
  // getAllUsers,
  // deleteUser,
} = require('../controllers/auth');

const {
  createFooditems,
  getFooditems,
  getFooditem,
  updateFooditem,
} = require('../controllers/food');

router.route('/signup').post(signUp);
router.route('/signin').post(signIn);
// router.route('/logOut').post(logOut);
// router.route('/users').get(getAllUsers);
// router.route('/user/:userid').delete(deleteUser);

// Routes for FoodItems
router.route('/addFood').post(createFooditems);
router.route('/fooditems').get(getFooditems);
router.route('/fooditem/:id').get(getFooditem);
router.route('/updateFood/:id').post(updateFooditem);

// const { authenticate } = require('../config/jwt.config');

// module.exports = function (app) {
//   app.post('/signup', AuthController.signUp);
//   app.post('/signIn', AuthController.signIn);
//   app.get('/users', AuthController.getAllUsers);
//   app.delete('/user/:userid', AuthController.deleteUser);
// };

module.exports = router;
