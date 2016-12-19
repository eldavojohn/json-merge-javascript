var should = require('chai').should(),
  merge = require('../../../src/main/js/recursive-merge');

var obj, obj1, obj2, objz;
function init() {
  obj = new Object();
  obj1 = {
    name: 'Phil',
    income: 57000,
    kids: ['johnny', 'chrissy', 'mikey'],
    subObject: {
      address: '123 Fake St',
      city: 'Vienna',
      country: 'Austria'
    },
    objectArray: [{
      name: 'apple',
      mass: 0.6,
      growsOn: 'tree'
    }, {
      name: 'grape',
      mass: 0.1,
      growsOn: 'vine'
    }, {
      name: 'watermelon',
      mass: 5.6,
      growsOn: 'vine'
    }]
  };
  obj2 = {
    name: 'Scott',
    dogs: 0.0,
    kids: ['johnny', 'cathy', 'danny'],
    subObject: {
      address: '123 Fake St',
      city: 'Vienna',
      planet: 'Earth'
    },
    objectArray: [{
      name: 'apple',
      mass: 0.6,
      growsOn: 'tree'
    }, {
      name: 'grape',
      mass: 0.1,
      growsOn: 'vine'
    }, {
      name: 'watermelon',
      mass: 5.6,
      growsOn: 'vine',
      color: 'green'
    }]
  };

  objz = {
    name: 'Scott',
    dogs: 0.0,
    kids: ['johnny', 'cathy', 'danny'],
    subObject: {
      address: '123 Fake St',
      city: 'Vienna',
      planet: 'Earth'
    },
    objectArray: [{
      name: 'apple',
      mass: 0.6,
      growsOn: 'tree'
    }, {
      name: 'grape',
      mass: 0.1,
      growsOn: 'vine'
    }, {
      name: 'watermelon',
      mass: 5.6,
      growsOn: 'vine'
    }]
  };
}

init();

function reinit() {
  init();
}

describe('#mergeTests', function() {
  it('verfies the merge function handles two objects with array properties', function() {
    merge.mergeObject(obj1, obj2);
    obj1.objectArray.length.should.equal(4);
    obj1.name.should.equal('PhilScott'); // unless you pass it into ignoreprops, strings are appended, values added
  });

  it('verifies two objects with the same properties are equal', function() {
    merge.objectEquals(obj2, objz).should.equal(true);
    merge.objectEquals(objz, obj2).should.equal(true);
  });

  it('verifies two empty objects with the no properties are equal', function() {
    merge.objectEquals(obj, obj).should.equal(true);
  });

  it('verifies two objects with different properties are not equal', function() {
    merge.objectEquals(obj1, obj2).should.equal(false);
    merge.objectEquals(obj2, obj1).should.equal(false);
  });

  it('verifies an empty object doesn\'t match an object with properties', function() {
    merge.objectEquals(obj, obj2).should.equal(false);
    merge.objectEquals(obj2, obj).should.equal(false);
  });

  it('verifies an ignored property is ignored', function() {
    reinit();
    merge.mergeObject(objz, obj2, 'name');
    obj1.name.should.equal('Phil'); // name was ignored
    reinit();
    merge.mergeObject(objz, obj2, ['name']);
    obj1.name.should.equal('Phil'); // name was ignored
    merge.objectEquals(obj2, obj).should.equal(false);
  });
});
