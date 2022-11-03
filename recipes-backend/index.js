const dotenv = require('dotenv').config()
const mongoose = require("mongoose")

const app = require("./server")
const mongo = require('./services/mongo')
mongo.mongoConnect()
mongoose.connection.on('connected', function () {  
    console.log('Mongoose connection open');
}); 
  
// If the connection throws an error
mongoose.connection.on('error',function (err) {  
    console.log('Mongoose connection error: ' + err);
}); 

