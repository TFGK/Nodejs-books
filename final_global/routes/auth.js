const express = require('express');
const passport = require('passport');
const bcrypt = require('bcrypt');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { User } = require('../models');

const router = express.Router();

router.post('/join', isNotLoggedIn, async (req, res, next)=>{
    const {email, nick, password, passwordCheck, tel } = req.body;

    const eamilExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if(!eamilExp.test(email)){
        req.flash('joinError', '이메일 형식에 맞지 않습니다.');
        return res.redirect('/join');
    }

    const passwordExp = /^[A-Za-z0-9]{6,12}$/;
    if(!passwordExp.test(password)){
        req.flash('joinError', '숫자와 문자를 포함한 6~12자리의 비밀번호를 설정해 주세요.');
        return res.redirect('/join');
    }
    if(password != passwordCheck){
        req.flash('joinError', '비밀번호가 동일하지 않습니다.');
        return res.redirect('/join');
    }

    const telExp = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/;
    if(!telExp.test(tel)){
        req.flash('joinError', '휴대전화 형식에 맞지 않습니다,');
        return res.redirect('/join');
    }
    
    try{
        const exUser = await User.findOne({ where: { email } });
        if(exUser){
            req.flash('joinError', '이미 가입된 이메일입니다.');
            return res.redirect('/join');
        }
        const hash = await bcrypt.hash(password, 12);
        await User.create({
            email,
            nick,
            password: hash,
            tel,
        });
        return res.redirect('/login');
    }catch (error){
        console.error(error);
        return next(error);
    }
});
router.post('/login', isNotLoggedIn, (req, res, next)=>{
    passport.authenticate('local', (authError, user, info)=>{
        if(authError){
            console.error(authError);
            return next(authError);
        }
        if(!user){
            req.flash('loginError', info.message);
            return res.redirect('/login');
        }
        return req.login(user, (loginError)=>{
            if(loginError){
                console.error(loginError);
                return next(loginError);
            }
            return res.redirect('/main');
        });
    })(req, res, next);
});

router.get('/logout', isLoggedIn, (req, res)=>{
    req.logout();
    req.session.destroy();
    res.redirect('/join');
});

router.get('/kakao', passport.authenticate('kakao'));

router.get('/kakao/callback', passport.authenticate('kakao',{
    failureRedirect: '/',
}),(req, res) => {
    res.redirect('/main');
});

router.get('/facebook', passport.authenticate('facebook'));

router.get('/facebook/callback', passport.authenticate('facebook',{
    failureRedirect: '/',
}),(req, res) => {
    res.redirect('/main');
});

module.exports = router;