const expect = require('chai').expect;
const Item = require('../../../src/db/model.js').Item

let item = new Item();

describe('schema', () => {
    it('Validate database schema', () => {
      expect(item).to.not.be.empty;
      expect(item).to.contain.property('_id');
      expect(item).to.contain.property('name');
      expect(item).to.contain.property('quantity');
      expect(item).to.contain.property('description');
    })
    
  })