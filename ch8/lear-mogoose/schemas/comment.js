const mongoose = require('mongoose');

const { Schema } = mongoose;
const { Types: {ObjectId} } = Schema;
const commentSchema = new Schema({
    commenter: {
        type: ObjectId,
        required: true,
        ref: 'user',
    },
    comment: {
        type: String,
        required: true,
    },
    createdAt:{
        type: Date,
        default:Date.now
    },
});


//const userSchema = new mongoose.Schema();
//이렇게도 정의 가능

module.exports = mongoose.model(
    'Comment',
    commentSchema
);