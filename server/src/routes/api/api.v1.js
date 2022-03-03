const express = require('express')

// Route files
const auth = require('../auth/auth.router');
const users = require('../users/users.router');
const bootcamps = require('../bootcamps/bootcamps.router');
const courses = require('../courses/courses.router');
const reviews = require('../reviews/reviews.router');

const api_v1 = express.Router()

// Routes middleware
api_v1.use('/auth', auth);
api_v1.use('/users', users);
api_v1.use('/bootcamps', bootcamps);
api_v1.use('/courses', courses);
api_v1.use('/reviews', reviews);

module.exports = api_v1