const http = require('http');

//반환 하는게 서버 객체?
http.createServer((req, res) => {
    // 화살표 함수로 정의한 콜백 함수
    res.write('<h1>굿 모닝</h>');  // write :버퍼에 작성 /아직전송 X
    res.end('<p1>굿 바이</p1>');
    // 여기에 어떻게 응답할 지 적어줍니다.
});

//서버만 생성
