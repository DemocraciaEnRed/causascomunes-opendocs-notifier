const MongoClient = require('mongodb').MongoClient;

let _db;

const connectDB = async (uri, col, callback) => {
     try {
         MongoClient.connect(uri, { useNewUrlParser: true }, (err, client) => {
             _db = client.db(col)
             return callback(err)
         })
     } catch (e) {
         throw e
     }
 }

const getDB = () => _db

const disconnectDB = () => _db.close()

module.exports = { connectDB, getDB, disconnectDB }