/*
*给定某无序数组，要求去除数组中的重复数字并且返回新的无重复数组。
*/
    // ES6 Implementation
    var array = [1, 2, 3, 5, 1, 5, 9, 1, 2, 8];

    Array.from(new Set(array)); // [1, 2, 3, 5, 9, 8]

    // ES5 Implementation
    var array = [1, 2, 3, 5, 1, 5, 9, 1, 2, 8];

    uniqueArray(array); // [1, 2, 3, 5, 9, 8]

    function uniqueArray(array) {
      var hashmap = {};
      var unique = [];
      for(var i = 0; i < array.length; i++) {
        // If key returns null (unique), it is evaluated as false.
        if(!hashmap.hasOwnProperty([array[i]])) {
          hashmap[array[i]] = 1;
          unique.push(array[i]);
        }
      }
      return unique;
    }
