// const mongoose = require('mongoose');
const { mongodbConfig } = require('./config');

const mongoose = require('mongoose');

module.exports = () => {
  mongoose
    .connect(`mongodb://${mongodbConfig.host}:${mongodbConfig.port}`, {
      dbName: mongodbConfig.dbName,
    })
    .then(() => {
      console.log('Mongodb connected....');
    })
    .catch(err => console.log(err.message));

  mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to db...');
  });

  mongoose.connection.on('error', err => {
    console.log(err.message);
  });

  mongoose.connection.on('disconnected', () => {
    console.log('Mongoose connection is disconnected...');
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      console.log(
        'Mongoose connection is disconnected due to app termination...'
      );
      process.exit(0);
    });
  });
};
