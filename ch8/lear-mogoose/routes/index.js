var express = require('express');
var router = express.Router();

var User = require('../schemas/user');
//mongoose에 의해 몽고디비의 users컬렉션과 연결된 모델 객체

/* GET home page. */
router.get('/', function (req, res, next) {
    User.find({}) // db.users.find({});   
        .then((users) => {
            res.render('mongoose', { users });
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});

//---------------async code-----------------------
//router.get('/', async (req, res, next) => {
//    try{
//        const users = await User.find({});
//        res.render('mongoose', users);
//    } catch(err) {
//        console.error(err);
//        next(err);
//    }
//});
//------------------------------------------------

module.exports = router;