const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const { sequelize } = require('./models/');
//db

const mainRouter = require('./routes/mainRouter');
const app = express(); 

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 8001);

app.use(morgan('dev'));     //로그 기록
app.use(express.static(path.join(__dirname, 'public'))); 
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('node'));      //세션 로그인에 필요
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'node',
  cookie: {
    httpOnly: true,
    secure: false,
  }, 
}));
app.use(flash());
//-------------------setting----------------------

app.use('/', mainRouter);
sequelize.sync();

//-------error handler----------//
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.status(err.status || 500);
  res.render('error');
});
app.listen(app.get('port'), () => {
  console.log(app.get('port'), ' 8001번 포트에서 대기중');
});