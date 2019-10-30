onst fs = require('fs');
const boolean = true;
const promise = new Promise((res, rej) => {
    if (boolean) {
        res(fs.readFile('ch3/3.6/readme2.txt', (err, data) => {
            if (err) {
                throw err;
            }
            console.log('1st', data.toString());
        }));
    } else {
        rej('실패');
    }
});

promise
    .then((t1) => {
        return new Promise((res, rej) => {
            res(fs.readFile('ch3/3.6/readme2.txt', (err,data) => {
                if(err){
                    throw err;
                }
                console.log('2st', data.toString());
            }));
            rej('실패');
        });
    })
    .then((t2) => {
        return new Promise((res, rej) => {
            res(fs.readFile('ch3/3.6/readme2.txt', (err, data) => {
                if(err) {
                    throw err;
                }
                console.log('3st', data.toString());
            }));
            rej('fail');
        });
    })
    .catch(err => {
        console.error(err);
    });
    