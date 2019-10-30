var express = require('express');
var router = express.Router();
var Comment = require('../schemas/comment');

/* GET users listing. */
router.get('/:id', function (req, res, next) {
    // GET /commetns/:id 
    Comment.find({
            commenter: req.params.id
        }).poppulate('commenter')
        // *사용자의 ???를 가져온다헀음 '/:no => params.no
        .then((comments) => {
            console.log(comments);
            res.json(comments);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});
router.post('/', (req, res, next) => { // POST /comments/
    const comment = new Comment({
        commenter: req.body.id,
        comment: req.body.comment,
    });
    comment.save() // db.comments.save({commenter:, comment})
        .then((result) => {
            //console.log(result);
            return Comment.populate(result, {path: 'commenter'});
        })
        .then((result) => {
            res.status(201).JSON(result);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});
router.patch('/:id', (req, res, next) => {
    Comment.update({ _id: req.params.id}, {comment: req.body.comment})
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});
router.delete('/:id', (req, res, next) => {
    Comment.remove({ _id: req.params.id})
        .then((result) => {
            res.json(result);
        })
        .catch((err) => {
            console.error(err);
            next(err);
        });
});


module.exports = router;
