const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const {isLoggedIn} = require('./middlewares');

const {Team} = require('../models');

const router = express.Router();

fs.readdir('uploads', (err)=>{
    if(err) {
        console.error('uploads 라는 폴더가 없습니다. 새로 생성합니다.');
        fs.mkdirSync('uploads');
    }
});

router.get('/', isLoggedIn, (req, res, next)=>{
    res.render('team');
});

router.get('/load', isLoggedIn, (req, res, next)=>{
    Team.findAll()
    .then((teams)=>{
        res.json(teams);
    })
    .catch((err)=>{
        console.error(err);
        next(err);
    });
})

const upload = multer(
    {
        storage: multer.diskStorage({
            destination(req, file, cb){ //cb => callback
                cb(null, 'uploads/')
            },
            filename(req, file, cb){
                // abc.jpg로 업로드하면
                // file.originalname: abc.jpg
                // ext: jpg
                const ext = path.extname(file.originalname);
                cb(null, path.basename(file.originalname, ext)+ //abc
                new Date().valueOf()+ ext );                    //20190611163755
                // abc20190611163755.jpg로 파일명 저장해라
            },
        }),
        limits: {fileSize: 5*1024*1024}, // 5M bytes 이하까지 저장가능
    }
);

router.post('/img', isLoggedIn, upload.single('img'), (req, res)=>{ //이미지 있을때 글쓰기
    console.log(req.file);
    res.json({url:`/img/${req.file.filename}`});
})

const upload2 = multer();
router.post('/', isLoggedIn, upload2.none(), (req, res, next)=>{ //이미지 없을때 글쓰기
        Team.create({
            hakbun: req.body.hakbun,
            name: req.body.name,
            comment: req.body.comment,
            img: req.body.url,
        })
        .then((result) => {
            res.redirect('/team');
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});

router.get('/add', isLoggedIn, (req, res, next)=>{
    res.render('teamAdd');
})

router.get('/:hakbun', isLoggedIn, (req, res, next) =>{
    Team.findAll({where: {hakbun: req.params.hakbun}})
    .then((teams)=>{
        console.log(teams);
        res.json(teams);
    })
    .catch((err)=>{
        console.error(err);
        next(err);
    });
});

router.delete('/:hakbun', isLoggedIn, (req, res, next)=>{
    Team.destroy({where: {hakbun: req.params.hakbun}})
        .then((result)=>{
            res.json(result);
        })
        .catch((err)=>{
            console.error(err);
            next(err);
        });
});

router.patch('/:hakbun', isLoggedIn, (req, res, next)=>{
    Team.update({comment: req.body.comment, name: req.body.name}, {where: {hakbun: req.params.hakbun}})
        .then((result)=>{
            res.json(result);
        })
        .catch((err)=>{
            console.error(err);
            next(err);
        });
});

module.exports = router; 