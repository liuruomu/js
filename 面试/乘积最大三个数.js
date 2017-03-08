
//数组找出整型数组中乘积最大的三个数

//给定一个包含整数的无序数组，要求找出乘积最大的三个数。

    var unsorted_array = [-10, 7, 29, 30, 5, -10, -70];

    computeProduct(unsorted_array); // 21000

    function sortIntegers(a, b) {
      return a - b;
    }

    // greatest product is either (min1 * min2 * max1 || max1 * max2 * max3)
    function computeProduct(unsorted) {
      var sorted_array = unsorted.sort(sortIntegers),
        product1 = 1,
        product2 = 1,
        array_n_element = sorted_array.length - 1;

      // Get the product of three largest integers in sorted array
      for (var x = array_n_element; x > array_n_element - 3; x--) {
          product1 = product1 * sorted_array[x];
      }
      product2 = sorted_array[0] * sorted_array[1] * sorted_array[array_n_element];

      if (product1 > product2) return product1;

      return product2
    };
