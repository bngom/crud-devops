const app = require("./app.js")
const db = require("./src/db");
require('dotenv').config();

const PORT = process.env.PORT || 8080;

db.connect()
.then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    })
  })
.catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

