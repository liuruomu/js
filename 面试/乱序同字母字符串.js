/*
*给定两个字符串，判断是否颠倒字母而成的字符串，譬如Mary与Army就是同字母而顺序颠倒：
*/
    var firstWord = "Mary";
    var secondWord = "Army";

    isAnagram(firstWord, secondWord); // true

    function isAnagram(first, second) {
      // For case insensitivity, change both words to lowercase.
      var a = first.toLowerCase();
      var b = second.toLowerCase();

      // Sort the strings, and join the resulting array to a string. Compare the results
      a = a.split("").sort().join("");
      b = b.split("").sort().join("");

      return a === b;
    }
