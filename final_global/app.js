const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

require('dotenv').config();

const pageRouter = require('./routes/page');
const authRouter = require('./routes/auth');
const teamRouter = require('./routes/team');
const faqRouter = require('./routes/faq');
const localRouter = require('./routes/local');


const { sequelize } = require('./models');
const passportConfig = require('./passport');

const app = express();
sequelize.sync();
passportConfig(passport);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.set('port', process.env.PORT || 8001);

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/img', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave:false,
    saveUninitialized:false,
    //secret : 'nodebirdsecret', 
    secret : process.env.COOKIE_SECRET,
    cookie:{
        httpOnly:true,
        secure:false,
    },
}));
app.use(flash());
app.use(passport.initialize()); 
app.use(passport.session());

app.use('/', pageRouter);
app.use('/auth', authRouter);
app.use('/team', teamRouter);
app.use('/faq', faqRouter);
app.use('/local', localRouter);

app.use((req, res, next)=>{
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res)=>{
    res.locals.message = err.message;
    res.locas.error = req.app.get('env') === 'development' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});

app.listen(app.get('port'),()=>{
    console.log(app.get('port'), '번 포트에서 대기 중 http://localhost:8001');
});