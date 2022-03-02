const express = require('express');
const {
  getBootcamp,
  getBootcamps,
  getBootcampsInRadius,
  deleteBootcamp,
  updateBootcamp,
  createBootcamp,
  bootcampPhotoUpload,
} = require('./bootcamps.controller');
const router = express.Router();

const Bootcamp = require('../../models/Bootcamp');

// include other resource routers
const courseRouter = require('../courses/courses.router');
const reviewRouter = require('../reviews/reviews.router');

const advancedResults = require('../../middleware/advancedResults');
const { protect, authorize } = require('../../middleware/auth');

// Re-route into other resources routers
router.use('/:bootcampId/courses', courseRouter);
router.use('/:bootcampId/reviews', reviewRouter);

router.route('/radius/:zipcode/:distance').get(getBootcampsInRadius);

router
  .route('/:id/photo')
  .put(protect, authorize('publisher', 'admin'), bootcampPhotoUpload);

router
  .route('/')
  .get(advancedResults(Bootcamp, 'courses'), getBootcamps)
  .post(protect, authorize('publisher', 'admin'), createBootcamp);

router
  .route('/:id')
  .get(getBootcamp)
  .put(protect, authorize('publisher', 'admin'), updateBootcamp)
  .delete(protect, authorize('publisher', 'admin'), deleteBootcamp);

module.exports = router;
