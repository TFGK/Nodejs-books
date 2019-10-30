var cd = true;
const promise = new Promise((res, rej) => {
    if(cd) {
        res('성공');
    }else {
        rej('실패');
    }
});

promise
    .then((suc) => {        //성공
    console.log(suc);
    return new Promise((res, rej) => {
        res('성공1');       //다음 then에 전달
     });
    })
    .then((suc2) => {       //suc2 = '성공1'
    console.log(suc2);    //출력
    return new Promise((res, rej) => {
        res('성공2');
     });
    })
    .then((suc3) => {       //suc3 = 성공2
    console.log(suc3);
    return new Promise((res, rej) => {
        res('성공3');
     });
    })
    .then((suc4) => {       //suc4 = 성공3
        console.log(suc4);
     }) 
    .catch((err) => {
        console.error(err);
        console.log(err);
    });
