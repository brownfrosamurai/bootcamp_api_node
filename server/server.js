const express = require('express');
const morgan = require('morgan');
const colors = require('colors');
const path = require('path');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/error');
const fileupload = require('express-fileupload');
const mongoSanitize = require('express-mongo-sanitize');
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const cors = require('cors');

// Load env files
require('dotenv').config();

// Connect to database
const connectDB = require('./config/db');
connectDB();

// Route files
const auth = require('./routes/auth/auth.router');
const users = require('./routes/users/users.router');
const bootcamps = require('./routes/bootcamps/bootcamps.router');
const courses = require('./routes/courses/courses.router');
const reviews = require('./routes/reviews/reviews.router');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('combined'));
}

// File upload
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent cross site scripting (XSS attacks)
app.use(xss());

// Rate limiting
// const limiter = rateLimit({
//   windowMs: 10 * 60 * 1000, //10 minutes
//   max: 100,
// });

// app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable cors
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Routes middleware
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);
app.use('/api/v1/reviews', reviews);

// Error handler
app.use(errorHandler);

const PORT = process.env.PORT || 8000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.underline
  )
);

//  Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err}`.red.bold);
  server.close(() => process.exit(1));
});
