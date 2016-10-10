var should = require('chai').should(),
    merge = require('../../../src/main/js/recursive-merge');

var obj = new Object();
var obj1 = {name: 'Phil', income: 57000, kids: ['johnny', 'chrissy', 'mikey'], subObject: {address: '123 Fake St', city: 'Vienna', country: 'Austria'},
  objectArray: [
    {name: 'apple', mass: 0.6, growsOn: 'tree'},
    {name: 'grape', mass: 0.1, growsOn: 'vine'},
    {name: 'watermelon', mass: 5.6, growsOn: 'vine'}
  ]
};
var obj2 = {name: 'Scott', dogs: 0.0, kids: ['johnny', 'cathy', 'danny'], subObject: {address: '123 Fake St', city: 'Vienna', planet: 'Earth'},
  objectArray: [
    {name: 'apple', mass: 0.6, growsOn: 'tree'},
    {name: 'grape', mass: 0.1, growsOn: 'vine'},
    {name: 'watermelon', mass: 5.6, growsOn: 'vine', color: 'green'}
  ]
};

var objz = {name: 'Scott', dogs: 0.0, kids: ['johnny', 'cathy', 'danny'], subObject: {address: '123 Fake St', city: 'Vienna', planet: 'Earth'},
  objectArray: [
    {name: 'apple', mass: 0.6, growsOn: 'tree'},
    {name: 'grape', mass: 0.1, growsOn: 'vine'},
    {name: 'watermelon', mass: 5.6, growsOn: 'vine'}
  ]
};

describe('#mergeTests', function() {
  it('verfies the merge function handles two objects with array properties', function() {
    var result = merge.mergeObject(obj1, obj2);
    obj1.objectArray.length.should.equal(4);
  });

  it('verifies two vectors are equal', function() {
    var equalityTest = merge.objectEquals(vec,vec);
    equalityTest.should.equal(true);
  });

  it('verifies two vectors of different length are not equal', function() {
    vec1 = [1, 2, 3, 4];
    vec2 = [1, 2, 3];
    merge.objectEquals(vec1,vec2).should.equal(false);
  });

  it('verifies two objects with the same properties are equal', function() {
    merge.objectEquals(obj2, objz).should.equal(true);
  });
});
