var express = require('express');
var User = require('../models').User;
var router = express.Router();

/* GET home page. */
// RESTful 서비스 구현해보기
router.get('/', function(req, res, next) {
    User.findAll()
        .then((users) => {
        res.render('sequelize', { users });
    })
        .catch((err) => {
        console.err(err);
        next(err);
    });
});

module.exports = router;
