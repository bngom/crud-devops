const mongoose = require('mongoose');
const Mockgoose = require('mockgoose').Mockgoose;
const mockgoose = new Mockgoose(mongoose);
const DB_URL = process.env.DB_URL || 'mongodb://mongo:27017/shopping-list';
const DB_URL_TEST = process.env.DB_URL_TEST || 'mongodb://mongo:27017/shopping-list-test';

function connect() {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === 'test') {

    mockgoose.prepareStorage()
      .then(() => {
        mongoose.connect(DB_URL_TEST,
          { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
          .then((res, err) => {
            console.log(res.status)
            if (err) return reject(err);
            resolve();
          })
      })
      } else {
          mongoose.connect(DB_URL,
            { useNewUrlParser: true, useCreateIndex: true })
            .then((res, err) => {
              if (err) return reject(err);
              resolve();
            })
      }
  });
}

function close() {
  return mongoose.disconnect();
}

module.exports = { connect, close };