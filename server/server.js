const app = require('./app')
const connectDB = require('./config/db');

// Load env files
require('dotenv').config();

// Connect to database
connectDB();

const PORT = process.env.PORT || 8000;

// Start server 
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
