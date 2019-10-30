const fs = require('fs');

var promise = function() {
    return new Promise ((res, rej) => { 
        fs.access('./forder', fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK, (err) => {
            if(err) {
                throw err;
                res(err);
            }   
            else {
                console.log('이미 폴더 있음');
            }
        });
    });
}

promise
    .then((g1) => {
    
})

/*const fs = require('fs');

var promise = function(param){
    return new Promise((resolve, reject)=>{
        fs.access(param, fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK, (err)=>{
            if(err){
                resolve(err);
            }else{
                rejec();
            }
        })
    });
}

promise('./folder2')
.then((err)=>{
    if(err.code === 'ENOENT'){
        console.log('폴더 없음');
        fs.mkdir('./folder2', (err)=>{if(err) throw err});
        console.log('폴더 만들기 성공');
        return promise('./folder2/newfile.js');
    }
})
.then((result)=>{
    fs.open('./folder2/newfile.js', 'w', (err, fd)=>{
        if(err) throw err
        console.log('빈 파일 만들기 성공', fd);
        fs.rename('./folder2/newfile.js', './folder2/newfffffile.js', (err)=>{
            if(err) throw err
            console.log('이름 바꾸기 성공');
        });
    });
})
.catch((err)=>{
    console.log(err);
})*/