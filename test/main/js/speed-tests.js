var underscore = require("underscore"),
  NanoTimer = require('nanotimer'),
  should = require('chai').should(),
  merge = require('../../../src/main/js/recursive-merge');

var timerObject = new NanoTimer();
var obj = new Object();
var obj1 = {
  name: 'Phil',
  income: 57000,
  kids: ['johnny', 'chrissy', 'mikey'],
  subObject: {
    address: '123 Fake St',
    city: 'Vienna',
    country: 'Austria'
  }
};
var obj2 = {
  name: 'Scott',
  dogs: 0.0,
  kids: ['johnny', 'cathy', 'danny'],
  subObject: {
    address: '123 Fake St',
    city: 'Vienna',
    planet: 'Earth'
  }
};

function underscoreJoinWrapper() {
  underscore.extend(obj, obj1, obj2);
};

function recursiveMergeJoinWrapper() {
  merge.mergeObject(obj1, obj2);
};

describe('#jqueryTimer', function() {
  it('display the amount of time underscore needs to merge two objects', function() {
    vec = [1, 2, 3, 4];
    var microsecs = timerObject.time(underscoreJoinWrapper, '', 's');
    console.log(microsecs + " seconds");
    merge.objectEquals(vec, vec).should.equal(true);
  });
  it('display the amount of time to merge two objects using the custom function', function() {
    vec = [1, 2, 3, 4];
    var microsecs = timerObject.time(recursiveMergeJoinWrapper, '', 's');
    console.log(microsecs + " seconds");
    merge.objectEquals(vec, vec).should.equal(true);
  });
});