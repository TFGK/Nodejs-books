var express = require('express');
var router = express.Router();      //라우터 객체를 만들고

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;            //모듈로 익스포트 해서 app에 리콰이어 가능
