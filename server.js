const app = require('./app.js')
const db = require('./src/db');

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '0.0.0.0';


db.connect()
.then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running at port ${PORT}`);
    })
  })
.catch(err => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });

