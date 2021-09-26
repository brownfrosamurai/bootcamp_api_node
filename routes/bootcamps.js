const express = require('express');
const router = express.Router();
const {
  getBootcamp,
  getBootcamps,
  getBootcampsInRadius,
  deleteBootcamp,
  updateBootcamp,
  createBootcamp,
} = require('../controllers/bootcamps');

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router.route('/').get(getBootcamps).post(createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(updateBootcamp)
  .delete(deleteBootcamp);

module.exports = router;
