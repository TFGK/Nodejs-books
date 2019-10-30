const fs = require('fs');
const boolean = true;
const promise = new Promise((res, rej) => {
    if (boolean) {
        fs.readFile('ch3/3.6/readme2.txt', (err, data) => {
            if (err) {
                throw err;
            }
            res(data);
        });
    } else
        rej('fail');
    });

promise
    .then((data) => {
    console.log('1st', data.toString());
    return data;
    //에러 안뜨면 res(data) 리턴됨
    })
    .then((data2) => {
    console.log('2st', data2.toString());
    return data2;
    })
    .then((data3) => {
    console.log('3st', data3.toString());
    })
    .catch((err) => {
    console.error(err);
    });


fs.readFile('ch3/3.6/readme2.txt', async (err, data) => {
    try {
        console.log('----------------async/await start ------------')
        const read = await console.log('1st', data.toString());
        const read2 = await console.log('2st', data.toString());
        const read3 = await console.log('3st', data.toString());
    } catch(err) {
        throw err;
    }
});
console.log('end');
     