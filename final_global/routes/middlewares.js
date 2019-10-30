exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){
        next();
    }else {
        // res.status(403).send('http://localhost:8001');
        res.redirect('/')
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){
        next();
    }else {
        res.redirect('/main');
    }
};

// exports.checkPower = (req, res, next) => {
//     if(req.use)
// }