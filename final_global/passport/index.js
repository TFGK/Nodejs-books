const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const facebook = require('./facebookStrategy');
const { User } = require('../models');

module.exports = (passport) => { // passport - app.js의 passport모듈의 객체
    passport.serializeUser((user, done)=>{   // login 메서드 실행 시 호출
        done(null, user.id);
    });
    
    passport.deserializeUser((id, done)=>{
        User.findOne({where : {id}})
        .then(user => done(null, user)) //req.user
        .catch(err => done(err));
    });

    local(passport);
    kakao(passport);
    facebook(passport);
}