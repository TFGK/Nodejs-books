const FacebookStrategy = require('passport-facebook').Strategy;

const { User } = require('../models');

module.exports = (passport) => {
    passport.use(new FacebookStrategy({
        clientID: process.env.FACEBOOK_ID,
        clientSecret: process.env.FACEBOOK_SECRET,
        callbackURL: '/auth/facebook/callback',
    }, async (req, accessToken, refreshToken, profile, done) => {
        try{
            console.log("-------facebook profile------",profile);   
            const exUser = await User.findOne({ where: { snsId: profile.id, provider: 'facebook' }});
            if(exUser){
                done(null, exUser);
            }else {
                const newUser = await User.create({
                    email: profile._json && profile._json.kaccount_email,
                    nick: profile.displayName,
                    snsId: profile.id,  
                    provider: 'facebook',
                });
                done(null, newUser);
            }
        }catch(error){
            console.error(error);
            done(error);
        }
    }));
}