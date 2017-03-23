/*
*给定两个数组，要求求出两个数组的交集，注意，交集中的元素应该是唯一的。
*/
    var firstArray = [2, 2, 4, 1];
    var secondArray = [1, 2, 0, 2];

    intersection(firstArray, secondArray); // [2, 1]

    function intersection(firstArray, secondArray) {
      // The logic here is to create a hashmap with the elements of the firstArray as the keys.
      // After that, you can use the hashmap's O(1) look up time to check if the element exists in the hash
      // If it does exist, add that element to the new array.

      var hashmap = {};
      var intersectionArray = [];

      firstArray.forEach(function(element) {
        hashmap[element] = 1;
      });

      // Since we only want to push unique elements in our case... we can implement a counter to keep track of what we already added
      secondArray.forEach(function(element) {
        if (hashmap[element] === 1) {
          intersectionArray.push(element);
          hashmap[element]++;
        }
      });

      return intersectionArray;

      // Time complexity O(n), Space complexity O(n)
    }
