const http = require('http');
const fs = require('fs');

const users = {}; //등록되는 사용자 정보를 저장하는 객체
const srv = http.createServer((req, res) => { //귀찮은 이유를 강조
    if (req.method === 'GET') {
        if (req.url === '/') {
            let a = './restFront.html';
            return fs.readFile(a, (err, data) => {
                if (err) {
                    throw err;
                }
                return res.end(data);
            });
        } else if (res.url === '/about') {
            let a = './about.html';
            return fs.readFile(a, (err, data) => {
                if (err) {
                    throw err;
                }
                return res.end(data);
            });
        } else if (res.url === '/users') {
            return res.end(JSON.stringify(users));
        }
        return fs.readFile(`.${req.url}`, (err, data) => {
            if (err) {
                res.writeHead(404, 'NOT FOUND');
                return res.end('NOT FOUND');
            }
            return res.end(data);
        });
    }
    else if (req.method === 'POST') {
        if (req.url === '/uesrs') {
            let body = '';
            req.on('data', (data) => {
                body += data;
            });
            return req.on('end', () => {
                console.log('POST본문(Body):', body);
                const {
                    name
                } = JSON.parse(body);
                const id = +new Date();
                users[id] = name;
                res.writeHead(201);
                res.end('등록 성공');
            });
        }
    } else if (req.method === 'PUT') {
        if (req.url.startsWith('/users/')) { //startsWith : url이 이걸로 시작하는가

            //http://localhost:3000/users/~~~~~
            //['']. [users], [~~~];
            // 0        1       2
            const key = req.url.split('/')[2]; //배열 인덱스 2번인 것을 가져가겠다.        
            let body = '';
            req.on('data', (data) => {
                body += data;
            });
            return req.on('end', () => {
                console.log('PUT 본문(body): ', body);
                users[key] = JSON.parse(body).name;
                // body ==> {name : '사용자 수정값'}
                return res.end(JSON.stringify(users));
            });
        }
    } else if (req.method === 'DELETE') {
        if (req.url.startsWith('/users/')) {
            const key = req.url.split('/')[2];
            delete users[key];
            return res.end(JSON.stringify(users));
        }
    }

    res.writeHead(404, 'NOT FOUND');
    return res.end('NOT FOUND');
});

srv.listen(3000, () => {
    console.log('서버 대기중 : 3000 포트 , http://localhost:3000');
});