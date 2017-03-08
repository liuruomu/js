/*
*给定两个字符串，判断是否颠倒字母而成的字符串，譬如Mary与Army就是同字母而顺序颠倒：
*/
    isPalindrome("racecar"); // true
    isPalindrome("race Car"); // true

    function isPalindrome(word) {
      // Replace all non-letter chars with "" and change to lowercase
      var lettersOnly = word.toLowerCase().replace(/\s/g, "");

      // Compare the string with the reversed version of the string
      return lettersOnly === lettersOnly.split("").reverse().join("");
    }
