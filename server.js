const http = require('http')
const app = require('./app')
const mongo = require('./services/db')

const port = process.env.PORT || 3000

const server = http.createServer(app)

const { MONGO_URL, DB_COLLECTION } = process.env

console.log(`[mongodb] Connecting to ${MONGO_URL}`)
mongo.connectDB(MONGO_URL, DB_COLLECTION, async function (err) {
  if (err) throw err
  console.log(`[mongodb] CONNECTED! To ${MONGO_URL}/${DB_COLLECTION}`)
  server.listen(port, () => console.log('Server listening on port:', port))
})

module.exports = server
