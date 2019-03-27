const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
   fs.readFile('./server2.html', (err, data) => {
      if(err){
          throw err;
      }
       res.end(data); 
   });
}).listen(3001, () => {
    console.log('3001포트에서 서버 대기 중');
});