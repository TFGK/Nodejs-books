module.exports = (sequelize, DataTypes) => (    //화살표 함수 문법 p60
    sequelize.define('hashtag',
    {
        title: {
            type: DataTypes.STRING(15),
            allowNull: false,
            unique: true,
        },
    }, {
        timestamps : true,      //createdAt, updatedAt, deletedAt
        paranoid: true,         // 필드/컬럼 자동 생성
    })
);