const fs = require('fs');
const boolean = true;
const read = new Promise((res, rej) => {
    if (boolean){
        fs.readFile('3.6/readme2.txt', (err, data) => {
            if (err) {
                throw err;
            }
            res(data.toString());
        });
    } else
        rej('fail');
});

read
    .then((success) => {
    console.log('1st', success);
    return new Promise((res, rej) => {
        res(success);
      });
    })
    .then((success2) => {
    console.log('2st', success2);
    return new Promise((res, rej) => {
        res(success2);
      });
    })
    .then((success3) => {
    console.log('3st', success3);
    })
    .catch((err) => {
    console.error(err);
    });

