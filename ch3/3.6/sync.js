//동기방식 메소드 : readFileSync

const fs = require('fs');
console.log('시작');
//fs.readFile('3.6/readme2.txt', (err, data) => {
//   if(err){
//       throw err;
//   } 
//    console.log('1번', data.toString());
//});
let data = fs.readFileSync('3.6/readme2.txt');
console.log('1번', data.toString());

data = fs.readFileSync('3.6/readme2.txt');
console.log('2번', data.toString());

data = fs.readFileSync('3.6/readme2.txt');
console.log('3번', data.toString());

console.log('끝');