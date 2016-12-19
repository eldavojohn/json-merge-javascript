function executeMerges() {
  var obj, obj1, obj2, objz;
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

  mergeObject(obj1, obj2, 'name');
  console.log(obj1);
}
