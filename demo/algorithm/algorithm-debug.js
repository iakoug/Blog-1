/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (s) {
  let arr = Array.from(s);
  trimSpaces(arr);
  reverseStr(arr);
  reverseSingleWord(arr);
  return arr.join('');
};

// 使用快慢指针，去掉多余的空格
var trimSpaces = function (arr) {
  let slowIndex = 0;
  let fastIndex = 0;
  while (fastIndex < arr.length) {
    // 如果快指针位置的值为空格，且前一个位置为undefined或前一个位置也是空格，则表明当前空格为多余空格
    if (
      arr[fastIndex] === ' ' &&
      (arr[fastIndex - 1] === undefined || arr[fastIndex - 1] === ' ')
    ) {
      // 如果快指针位置是空格，则继续移动快指针
      fastIndex++;
    } else {
      // 将快指针的值赋值给慢指针
      arr[slowIndex] = arr[fastIndex];
      slowIndex++;
      fastIndex++;
    }
  }
  arr.length = arr[fastIndex - 1] === ' ' ? slowIndex - 1 : slowIndex; //  去除末尾空格
};

// 使用双指针，翻转每一个字符
var reverseStr = function (arr, start = 0, end = arr.length - 1) {
  let left = start;
  let right = end;
  while (left < right) {
    [arr[left], arr[right]] = [arr[right], arr[left]];
    left++;
    right--;
  }
};

// 使用快慢指针翻转每一个单词
var reverseSingleWord = function (arr) {
  let start = 0;
  for (let i = 0; i < arr.length; i++) {
    // 如果不为空格，则累加拼接单词
    if (arr[i] !== ' ') {
      continue;
    } else if (arr[i] === ' ') {
      // 如果匹配到空格，说明一个单词组装完成
      reverseStr(arr, start, i - 1);
      start = i + 1;
    }
  }
  reverseStr(arr, start, arr.length - 1); // 旋转最后一个单词
};

console.log(reverseWords(' hello  word  '));
