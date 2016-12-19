module.exports = {
  objectEquals: function(a, b, ignoreProps = []) {
    return objectEqualsRecursive(a, b, ignoreProps);
  },

  mergeObject: function(a, b, ignoreProps = []) {
    recursiveMerge(a, b, ignoreProps);
  }
}

// boolean function that returns only true or false
function objectEqualsRecursive(a, b, ignoreProps = []) {
  var ignoreProps = [];
  if (a.constructor != b.constructor || a && !b || !b && a) {
    return false;
  } else if (a == b) {
    return true;
  }

  var valueClass = a.constructor;
  switch (valueClass) {
    case Object:
      if (a && b) {
        var aprops = Object.getOwnPropertyNames(a);
        var bprops = Object.getOwnPropertyNames(b);
        if (aprops.length != bprops.length) {
          return false;
        }
        Object.getOwnPropertyNames(b).forEach(function(property) {
          if (ignoreProps.indexOf(property) == -1) {
            if (aprops.indexOf(property) == -1) {
              return false;
            } else {
              var quickTest = objectEqualsRecursive(a[property], b[property], ignoreProps);
              if (!quickTest) {
                return false;
              }
            }
          }
        });
      } else if (b) {
        return false;
      }
      break;
    case String:
      if (a && b && a != b) {
        return false;
      } else if (b) {
        return false;
      }
      break;
    case Array:
      if (a && b) {
        return arraysMatch(a, b, ignoreProps);
      } else if (b) {
        return false;
      }
      break;
    default:
  }

  return true;
}

function arraysMatch(arr1, arr2, ignoreProps = []) {
  if (arr1.length != arr2.length) {
    return false;
  }
  var tempMatch;
  arr1.forEach(function(el1) {
    tempMatch = false;
    for (i = 0; i < arr2.length && !tempMatch; i++) {
      if (objectEqualsRecursive(el1, arr2[i], ignoreProps)) {
        tempMatch = true;
      }
    }
    if (!tempMatch) {
      return false;
    }
  });
  return true;
}

function arraysMerge(arr1, arr2, ignoreProps = []) {
  var tempMatch;
  var tempArray = [];
  arr2.forEach(function(el1) {
    tempMatch = false;
    for (i = 0; i < arr1.length && !tempMatch; i++) {
      if (objectEqualsRecursive(el1, arr1[i], ignoreProps)) {
        tempMatch = true;
      }
    }
    if (!tempMatch) {
      tempArray.push(el1)
    }
  });
  return arr1.concat(tempArray);
}

function recursiveMerge(a, b, ignoreProps = []) {
  var aprops = Object.getOwnPropertyNames(a);
  Object.getOwnPropertyNames(b).forEach(function(property) {
    if (aprops.indexOf(property) != -1 && ignoreProps.indexOf(property) == -1) {
      // need to merge
      var value = a[property], bvalue = b[property];
      var valueClass = value.constructor, bvalueClass;
			if(b[property]) {
				bvalueClass = bvalue.constructor;
			}
      switch (valueClass) {
        case Object:
          if (value && b[property]) {
            recursiveMerge(value, b[property], ignoreProps);
          } else if (b[property]) {
            a[property] = b[property];
          }
          break;
        case String:
          if (value && b[property] && valueClass == bvalueClass && value != b[property]) {
            a[property] = value.concat(b[property]);
          } else if (b[property]) {
            a[property] = b[property];
          }
          break;
        case Array:
          if (value && b[property] && valueClass == bvalueClass) {
            a[property] = arraysMerge(value, b[property]);
          } else if (b[property]) {
            a[property] = b[property];
          }
          break;
        case Number:
          if (value && b[property] && valueClass == bvalueClass) {
            a[property] = value + b[property];
          } else if (b[property]) {
            a[property] = b[property];
          }
          break;
        default:
          console.log('miss on value class ' + valueClass.toString());
      }
    } else {
      a[property] = b[property];
    }
  });
}

function newTruthiness(axiom) {
  // the value of zero returns false in javascript so let's define this ourselves
  if (axiom == 0) {
    return true;
  } else if (axiom && axiom.constructor == Array && axiom.length == 0) { // if it's an empty array, call it false
    return false;
  } else {
    return axiom;
  }
}
