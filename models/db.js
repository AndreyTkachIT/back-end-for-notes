const mongoose = require('mongoose');

const db = require('./property');

function connectDb () {
  const url = `mongodb+srv://${db.MONGO_USERNAME}:${db.MONGO_PASSWORD}@${db.MONGO_HOSTNAME}/${db.MONGO_DB}?authSource=admin`;
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    keepAlive: true,
  });

  mongoose.connection.on('connected', () => {
    console.log("Mongoose default connection is open.");
  });

  mongoose.connection.on('error', (err) => {
    console.log("Mongoose default connection has occurred "+err+" error");
  });

  mongoose.connection.on('disconnected', () => {
    console.log("Mongoose default connection is disconnected");
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log("Mongoose default connection is disconnected due to application termination");
      process.exit(0)
    });
  });
}


module.exports = {
  connectDb,
};





