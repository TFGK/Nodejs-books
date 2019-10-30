const express = require('express');
const router = express.Router();

const { isLoggedIn } = require('./middlewares');

const { Question, Comment, User } = require('../models');

router.get('/', isLoggedIn, (req, res, next)=>{
    Question.findAll()
        .then((questions)=>{
            res.render('faq', {questions});
        })
        .catch((err)=>{
            console.error(err);
            next(err);
        })
})

router.get('/descriptions/:id', isLoggedIn, (req, res, next)=>{
    Question.findOne({where: { id: req.params.id } })
    .then((questinos)=>{
        res.json(questinos);
    })
    .catch((err)=>{
        console.error(err);
        next(err);
    });
})

router.get('/comments/:id', isLoggedIn, (req, res, next)=>{
    Comment.findAll({
            where: {key: req.params.id}
    })
    .then((comments)=>{
        res.json(comments);
    })
    .catch((err)=>{
        console.error(err);
        next(err);
    });
})

router.get('/add', isLoggedIn, (req, res, next)=>{
    res.render('faqAdd');
})

router.post('/comments', isLoggedIn, (req, res, next)=>{
    Comment.create({
        key: req.body.id,
        comment: req.body.comment,
    })
    .then((questions)=>{
        res.status(201).json(questions);
    })
    .catch((err)=>{
        console.error(err);
        next(err);
    })
})

router.post('/', isLoggedIn, (req, res, next)=>{
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1;
    var hh = today.getHours();
    if(dd<10) dd='0'+dd;
    if(mm<10) mm='0'+mm;
    today = mm+'/'+dd+'/'+hh;
    Question.create({
        title: req.body.title,
        description: req.body.description,
        createdAt: today,
    })
    .then((questinos)=>{
        res.redirect('/faq');
    })
    .catch((err)=>{
        console.error(err);
        next(err);
    });
});

module.exports = router