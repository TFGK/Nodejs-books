const timeout = setTimeout(() => {
    console.log('1.5초 후 실행 timeout');
}, 1500);

const interval = setInterval(() => {
    console.log('1초마다 실행 interval');
}, 1000);

const timeout2 = setTimeout(() => {
    console.log('실행되지 않습니다 timeout2');
}, 15000);

setTimeout(() => {
    clearTimeout(timeout2);
    clearInterval(interval);
}, 10000);

const immediate = setImmediate(() => {
    console.log('즉시 실행 immediate');
});

const immediate2 = setImmediate(() => {
   console.log('실행되지 않습니다. immediate2');
});

clearImmediate(immediate2);