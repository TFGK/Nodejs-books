const mongoose = require('mongoose');

module.exports = () => {
    //몽구스 호출 함수
    const connect = () => {
        if (process.env.MODE_ENV !== 'production') {
            mongoose.set('debug', true);
        }
        //몽고디비 연결을 위한 URL 지정    /파라미터 3개
        //1. URL / 2. 객체 / 3.에러 handler
        mongoose.connect('mongodb://nodejs:node@localhost:27017/admin', {
            dbName: 'nodejs' // <-- 사용할 DB입력
        }, (err) => {
            if (err) {
                console.log('mongoDB 연결 에러', err);
            } else {
                console.log('mongDB 연결 성공');
            }
        });
    };
    connect();

    //몽구스 연결 에러 이벤트
    mongoose.connection.on('error', (error) => {
        console.error('몽고디비 연결 에러', error);
    });
    //몽구스 연결 해제 이벤트 (재시도)
    mongoose.connection.on('disconnected', () => {
        console.error('몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.');
        connect();
    });

    require('./user'); //스키마 연
    require('./comment');
};

//    ( () => { //익명함수 정의와 호출 한꺼번에 하기
//        
//    })();  