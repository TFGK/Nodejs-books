const A = require('./globalA');
// A는 함수가 됨

global.message = '안녕하세요';
console.log(A());