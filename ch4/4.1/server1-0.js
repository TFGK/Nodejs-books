const http = require('http');

const server = http.createServer((req, res) => {
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
});
server.listen(3001);

server.on('listening', () => {
   console.log('3001포트 대기 중');
});
server.on('error', (err) => {
   console.error(err); 
});