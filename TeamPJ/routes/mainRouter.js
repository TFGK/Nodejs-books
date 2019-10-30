const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('main', {
        title: '후쿠오카',
    });
});
router.get('/profile', (req, res) => {
    res.render('profile');
});

module.exports = router;



 