const { odd, even } = require('./var');
const checkNumber = require('./func');

function checkStrOddOrEven(str) {
    if(str.length % 2){ // 홀수면 이거   JS에서 1=true / 0=false
        return odd;
    }
    return even;        // 짝수면 이거
}
console.log(checkNumber(10));
console.log(checkStrOddOrEven('Hello'));

