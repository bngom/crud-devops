const expect = require('chai').expect;
//const assert = require('chai').assert;
const request = require('supertest');
const app = require('../../../app.js');
const db = require('../../../src/db/index.js');

let id;
let name;
let quantity;

let item = { 
  name: 'ok', 
  quantity: '2', 
  description: '200 g President', 
};

describe('Test routes', () => {
    beforeEach((done) => {
      
      db.connect()
        .then(() => done())
        .catch((err) => done(err));
    });
  
    afterEach((done) => {
      db.close()
        .then(() => done())
        .catch((err) => done(err));
    });
  
    it('Create Item', (done) => {
      request(app).post('/api/item')
        .send(item)
        .then((res) => {
          id = res.body._id;
          name = res.body.name;
          quantity = res.body.quantity;
          console.log(id + ":" + name + ":" + quantity);
          expect(res.body.name).to.not.equal('');
          expect(res.body.name).to.be.a('string');
          expect(res.body.quantity).to.be.a('number');
          expect(res.body.quantity).to.be.greaterThan(0);
          done();
        })
        .catch((err) => done(err));
    });

    it('Find item', (done) => {
      request(app).get('/api/item/'+id)
      .then((res) => {
          expect(res.status).to.equal(200)
          done();
      })
      .catch((err) => done(err));
    });

    it('Find all item', (done) => {
      request(app).get('/api/item/')
      .then((res) => {
          expect(res.status).to.equal(200)
          done();
      })
      .catch((err) => done(err));
    });

    it('Find some items', (done) => {
      // retrieve items based on some conditions
      request(app).get('/api/item?name=Nutela')
      .then((res) => {
          expect(res.status).to.equal(200)
          done();
      })
      .catch((err) => done(err));
    });

    it('Update one item', (done) => {
      item['description'] = 'coffee';
      item['quantity'] = 1;
      request(app).put('/api/item/'+id)
      .send(item)
      .then((res) => {
          const body = res.body;
          expect(res.status).to.equal(200)
          console.log(body)
          done();
      })
      .catch((err) => done(err));
    });

    it('Delete item', (done) => {
      // this test will be skipped
      request(app).delete('/api/item/'+id)
      .then((res) => {
          expect(res.status).to.equal(200)
          done();
      })
      .catch((err) => done(err));
    });

    it('Delete all items', (done) => {
      // this test will be skipped
      request(app).delete('/api/item')
      .then((res) => {
          expect(res.status).to.equal(200)
          done();
      })
      .catch((err) => done(err));
    });
})