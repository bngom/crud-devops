const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

var start = Date.now()

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {

  var today = new Date();

  var date = today.getFullYear()+'-'+(today.getMonth() + 1)+'-'+today.getDate();

  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  var dateTime = date+' '+time;

  var now = (Date.now() - start) / 1000

  res.json({ message: `Web app v1 - date: ${dateTime}`});
});

require("./src/routes")(app);

module.exports = app;