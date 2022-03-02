const Review = require('../../models/Review');
const Bootcamp = require('../../models/Bootcamp');
const ErroResponse = require('../../utils/errorResponse');
const asyncHandler = require('../../middleware/async');

// @desc    Get reviews
// @route   GET /api/v1/reviews
// @route   GET /api/v1/bootcamps/:bootcampId/reviews
// @access  Public

exports.getReviews = asyncHandler(async (req, res, next) => {
  if (req.params.bootcampId) {
    const reviews = await Review.find({ bootcamp: req.params.bootcampId });

    return res.status(200).json({
      success: true,
      count: reviews.length,
      data: reviews,
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

// @desc    Get a single reviews
// @route   GET /api/v1/reviews/:id
// @access  Public

exports.getReview = asyncHandler(async (req, res, next) => {
  const review = await Review.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description',
  });

  if (!review) {
    return next(
      new ErroResponse(`No review found with the id of ${req.params.id} `, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: review,
  });
});

// @desc    Add a bootcamp review
// @route   POST /api/v1/bootcamps/:bootcampId/review
// @access  Private

exports.addReview = asyncHandler(async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;
  req.body.user = req.user.id;

  const bootcamp = await Bootcamp.findById(req.body.bootcamp);

  if (!bootcamp) {
    return next(
      new ErroResponse(`No bootcamp with id of ${req.body.bootcamp}`, 404)
    );
  }

  console.log('running');
  // Make sure user has role user
  if (req.user.role !== 'user' || req.user.role !== 'user') {
    return next(
      new ErroResponse(
        `User with id ${req.user.id} is not authorized to add a review to bootcamp ${bootcamp.id}`,
        401
      )
    );
  }

  const review = await Review.create(req.body);

  res.status(201).json({
    success: true,
    data: review,
  });
});

// @desc    Update a reviews
// @route   PUT /api/v1/reviews/:id
// @access  Private

exports.updateReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  if (!review) {
    return next(
      new ErroResponse(`No review found with the id of ${req.params.id} `, 404)
    );
  }

  review = await Review.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  // Make sure review belongs to user or
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErroResponse(`Not authorized to update review`, 401));
  }

  res.status(200).json({
    success: true,
    data: review,
  });
});

// @desc    Delete a  review
// @route   DELETE /api/v1/reviews/:id
// @access  Private

exports.deleteReview = asyncHandler(async (req, res, next) => {
  let review = await Review.findById(req.params.id);

  console.log(req.user.role);
  if (!review) {
    return next(new ErroResponse(`No review with id of ${req.params.id}`, 404));
  }

  // Make sure user is course owner
  if (review.user.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErroResponse(`Not authorized to update review`, 401));
  }

  await review.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});
