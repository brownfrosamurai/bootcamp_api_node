const path = require('path')
const http = require('http')

const { mongoConnect } = require('./config/db');

const app = require('./app')

const PORT = process.env.PORT || 8000

const server = http.createServer(app)

async function startServer() {
  await mongoConnect();

  server.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`)
  })
}

startServer()
