const express = require('express');
const {
  getCourses,
  getCourse,
  addCourse,
  updateCourse,
  deleteCourse,
} = require('./courses.controller');

const Course = require('../../models/Course');
const router = express.Router({ mergeParams: true });

const advancedResults = require('../../middleware/advancedresults.middleware');
const { protect, authorize } = require('../../middleware/auth.middleware');

router
  .route('/')
  .get(advancedResults(Course), getCourses)
  .post(protect, authorize('publisher', 'admin'), addCourse);

router
  .route('/:id')
  .get(getCourse)
  .put(protect, authorize('publisher', 'admin'), updateCourse)
  .delete(protect, authorize('publisher', 'admin'), deleteCourse);

module.exports = router;
