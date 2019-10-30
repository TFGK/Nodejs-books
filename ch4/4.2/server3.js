const http = require('http');
//parseCookies = 쿠키문자열을 객체로 변환함
//WriteHead : 요청헤더에 입력하는 메서드
//Set-Cookes : 브라우저에게 쿠키를 설정하려고 명령
const parseCookies = (cookie = '') =>
    cookie  // 메서드 체인방식 = .(메소드) 로 실행하는 방식
        .split(';')
        .map(v => v.split('='))
        .map(([k, ...vs]) => [k, vs.join('=')])
             //['mycookie', 'test']
        .reduce((acc, [k, v]) => {
            acc[k.trim()] = decodeURIComponent(v);  //한글때문에 넣음
            //연관배열 = 객체와 같다
            return acc;
        }, {});

http.createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    console.log(req.url, cookies);
    res.writeHead(200, { 'Set-Cookie': 'mycookie=test'});
    res.end('hello cookie');
})
    .listen(3001, () => {
        console.log('3001포트로 서버 대기중') ;
});
    