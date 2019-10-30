const mongoose = require('mongoose');

const { Schema } = mongoose;

const userSchema = new Schema({
    name:{
        type: String,
        required: true,     //필수 여부
        unique: true
    },
    age:{
        type: Number,
        required: true
    },
    married:{
        type: Boolean,
        required: true
    },
    createAt:{
        type: Date,
        default:Date.now
    },
    comment: String
});
//const userSchema = new mongoose.Schema();
//이렇게도 정의 가능

module.exports = mongoose.model(
    'User',     //소스코드상에서 사용될 모델 이름
    userSchema  //실제 매칭되는 모델 객체
);

