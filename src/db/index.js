const mongoose = require("mongoose");
const Mockgoose = require("mockgoose").Mockgoose;
const mockgoose = new Mockgoose(mongoose);
const DB_URL = process.env.DB_URL || "mongodb://mongo:27017/shopping-list";

function connect() {
  return new Promise((resolve, reject) => {

    mockgoose.prepareStorage()
      .then(() => {
        mongoose.connect(DB_URL,
          { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
          .then((res, err) => {
            if (err) return reject(err);
            resolve();
          })
      })
  });
}

function close() {
  return mongoose.disconnect();
}

module.exports = { connect, close };