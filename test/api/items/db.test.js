// const mongoose = require('mongoose');
const mongoose = require('mongoose');
const Item = require('../../../src/db/model').Item;
require('dotenv').config();

const MONGO_URI = process.env.DB_URL || "mongodb://mongo:27017/shopping-list";

describe('Database Tests', () => {
  before(function (done) {

    mongoose.connect(MONGO_URI);
    const db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error'));
    db.once('open', () => {
      console.log('Connected to database!');
      done();
    });
  });

  describe('Test Database', () => {
    //Save object with 'name' value of 'Mike"
    it('New Item saved to database', (done) => {
      var item = new Item({
        name: 'beurre', 
        quantity: '2', 
        description: '200 g President', 
      });
 
      item.save(done);
    });

    it('Do not save incorrect format to database', (done) => {
      //Attempt to save with wrong info.
      var BadSchema = new Item({
        WRONG_name: 'bad', 
        quantity: '2', 
        description: '200 g President', 
      });

      BadSchema.save(err => {
        if(err) { return done(); }
        throw new Error('Should generate error!');
      });
    });

    it('Should retrieve data from database', (done) => {
      //Look up the 'beurre' item previously saved.
      Item.find({}, (err, name) => {
        if(err) {throw err;}
        done();
      });
    });
  });

  xit('should delete all item from database', (done) =>{
    Item.deleteMany({}, (err) => {
      if(err){throw err;}
      done();
    })
  });

  after(function(done){
    mongoose.connection.db.dropDatabase(() =>{
      mongoose.connection.close(done);
    });
  });
});


