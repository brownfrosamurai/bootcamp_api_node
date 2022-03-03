const mongoose = require('mongoose');

mongoose.connection.once('open', () => {
  console.log(`MongoDB connected to ${mongoose.connection.host}!`.blue)
})

mongoose.connection.on('error', (err) => {
  console.log(err.red)
})

async function mongoConnect() {
  await mongoose.connect(process.env.MONGO_URI)
}

async function mongoDisconnect() {
  await mongoose.disconnect()
}

module.exports = {
  mongoConnect,
  mongoDisconnect
}