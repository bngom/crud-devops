const mongoose = require("mongoose");
const Mockgoose = require("mockgoose").Mockgoose;
const mockgoose = new Mockgoose(mongoose);
const MONGO_URI = process.env.DB_URL || "mongodb://mongo:27017/shopping-list";

function connect() {
  return new Promise((resolve, reject) => {
    if (process.env.NODE_ENV === "test") {
    mockgoose.prepareStorage()
      .then(() => {
        mongoose.connect(MONGO_URI,
          { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
          .then((res, err) => {
            if (err) return reject(err);
            resolve();
          })
      })
      } else {
          mongoose.connect(MONGO_URI,
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