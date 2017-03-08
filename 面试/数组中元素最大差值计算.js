/*
*给定某无序数组，求取任意两个元素之间的最大差值，注意，这里要求差值计算中较小的元素下标必须小于较大元素的下标。譬如[7, 8, 4, 9, 9, 15, 3, 1, 10]这个数组的计算值是 11( 15 – 4 ) 而不是 14(15 – 1)，因为 15 的下标小于 1。
*/
    var array = [7, 8, 4, 9, 9, 15, 3, 1, 10];
    // [7, 8, 4, 9, 9, 15, 3, 1, 10] would return `11` based on the difference between `4` and `15`
    // Notice: It is not `14` from the difference between `15` and `1` because 15 comes before 1.

    findLargestDifference(array);

    function findLargestDifference(array) {

      // 如果数组仅有一个元素，则直接返回 -1

      if (array.length <= 1) return -1;

      // current_min 指向当前的最小值

      var current_min = array[0];
      var current_max_difference = 0;

      // 遍历整个数组以求取当前最大差值，如果发现某个最大差值，则将新的值覆盖 current_max_difference
      // 同时也会追踪当前数组中的最小值，从而保证 `largest value in future` - `smallest value before it`

      for (var i = 1; i < array.length; i++) {
        if (array[i] > current_min && (array[i] - current_min > current_max_difference)) {
          current_max_difference = array[i] - current_min;
        } else if (array[i] <= current_min) {
          current_min = array[i];
        }
      }

      // If negative or 0, there is no largest difference
      if (current_max_difference <= 0) return -1;

      return current_max_difference;
    }
