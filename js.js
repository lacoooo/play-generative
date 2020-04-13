/**
 * @param {number} x
 * @return {boolean}
 */
var isPalindrome = function(x) {
    x = String(x)
    for (var i = 0; i < x.length / 2; i ++) {
        if (i === x.length - i - 1) {
            break
        }
        if (x[i] !== x[x.length  - i - 1]) {
            return false
        }
    }
    return true
};

console.log(isPalindrome(12123))