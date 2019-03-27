const http = require('http');

http.createServer((req, res) => {
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
}).listen(3550, () => {
    console.log('3550에서 서버 대기중');
});

// 요청에 대한 응답
// listen(포트, 호스트(), 함수)
// 포트 사용하고 있으면 에러뜨는듯 er; throw 어쩌구
