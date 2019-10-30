const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');

const { Hukuoka }  = require('../models');
const { isLoggedIn } = require('./middlewares');
const router = express.Router();

router.get('/', isLoggedIn, (req, res)=>{
    res.render('local');
})
router.get('/add_image', isLoggedIn, (req, res)=>{
    res.render('local_add_image');
})

//사진 업로드
fs.readdir('uploads', (err) => {
    if (err) {
        console.error('uploads 폴더가 없어서 폴더를 생성합니다.');
        fs.mkdirSync('uploads');    
    }
});
const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'uploads/');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, path.basename(file.originalname, ext) + new Date().valueOf + ext);
        },
    }),
    limits: { fileSize: 5 * 1024 * 1024 },
});
router.post('/img', upload.single('img'), (req, res) => {
    console.log(req.file);
    res.json({ url : `/img/${req.file.filename}` });
});
const upload2 = multer();

 //후쿠오카 생성
router.post('/', isLoggedIn, upload2.none(), (req, res, next) => {
    Hukuoka.create({
        img: req.body.url,
        title: req.body.title,
        content: req.body.content,
    })
    .then((result) => {
        res.redirect('/local/add_image');
        //res.redirect('/local/add_image');
        res.status(201).json("------result------"+result);
    })
    .catch((err) => {
        console.error(err);
        next(err);
    });
});


router.get('/hukuoka/:id', isLoggedIn, (req, res)=>{
    Hukuoka.findOne({
        where: {id: req.params.id},
    })
      .then((Hukuokas) => {
          console.log('1234',Hukuokas);
          res.json(Hukuokas);
      })
      .catch((err) => {
          console.error(err);
          next(err);
      });
})


router.get('/hukuoka/', isLoggedIn, (req, res)=>{
    Hukuoka.findAll()
      .then((Hukuokas) => {
          console.log('=-=-==--=-=-=-=-=-=-=-=--=-=-=-=--=-=');
          console.log(Hukuokas);
          res.json(Hukuokas);
      })
      .catch((err) => {
          console.error(err);
          next(err);
      });
})

router.patch('/hukuoka/:id', isLoggedIn, (req, res) => {
    Hukuoka.update({
            title: req.body.title,
            content: req.body.content
        }, {
            where: {
                id: req.params.id
            }
        })
        .then((Hukuokas) => {   
            res.json(Hukuokas);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
})

//삭제
router.delete('/:id', isLoggedIn, (req, res)=>{
    Hukuoka.destroy({
        where: {id: req.params.id},
    })
      .then((Hukuokas) => {
          console.log(Hukuokas);
          res.json(Hukuokas);
      })
      .catch((err) => {
          console.error(err);
          next(err);
      });
})


module.exports = router;