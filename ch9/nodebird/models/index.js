const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
//model들의 관계 설정 (분석 중요) N:M 관계 고려해야함 

//user, post, hashtag 콜백함수 호출
db.User = require('./user')(sequelize, Sequelize);  
db.Post = require('./post')(sequelize, Sequelize);
db.Hashtag = require('./hashtag')(sequelize, Sequelize);

db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);     // User : Post = 1 : N

db.Post.belongsToMany(db.Hashtag, {through: 'PostHashtag'});       
db.Hashtag.belongsToMany(db.Post, {through: 'PostHashtag'});
//글 하나에 해쉬태그를 여렇게 넣기 때문에 belongsToMany를 씀
//Post : Hashtag = N : M
//자동생성 필드 : postId, hashtagId

db.User.belongsToMany(db.User,      //팔로잉
   {
    foreignKey: 'followingId',
    as: 'Followers',
    through: 'Follow',
   }
);
db.User.belongsToMany(db.User,      //팔로워
   {
    foreignKey: 'followerId',
    as: 'Followings',
    through: 'Follow',
   }
);
//중간관계 Follow table에 followingId, followerId가 필드로 생김



module.exports = db;        //DB객체 모듈화
