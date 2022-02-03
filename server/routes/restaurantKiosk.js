const express = require('express');
const router = express.Router();
const {
  signUp,
  signIn,

} = require('../controllers/auth');

const {
  createFooditems,
  getFooditems,
  getFooditem,
  updateFooditem,
  deleteFooditem,
} = require('../controllers/food');

router.route('/signup').post(signUp);
router.route('/signin').post(signIn);

// Routes for FoodItems
router.route('/addFood').post(createFooditems);
router.route('/fooditems').get(getFooditems);
router.route('/fooditem/:id').get(getFooditem);
router.route('/updateFood/:id').put(updateFooditem);
router.route('/deleteFood/:id').delete(deleteFooditem);



module.exports = router;
