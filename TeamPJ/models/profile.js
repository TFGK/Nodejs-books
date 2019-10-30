module.exports = (sequelize, DataTypes) => (
    sequelize.define('profile', // user 테이블
    {           //allowNull : true = not null이 true 라는 뜼
        id: {   //학번
          type: DataTypes.STRING(10),
            primaryKey: true,
        },
        name: { //이름
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        picture: {  //사진
            type: DataTypes.BLOB,
            allowNull: false,
        },
        comment: {  //코멘트
            type: DataTypes.STRING,
            allowNull: true,        
        },
        interest: { //관심사
            type: DataTypes.STRING(20),
            allowNull: true,        
        },
        motto: {    //좌우명
            type: DataTypes.STRING(50),
            allowNull: true,        
        },
        email: {    //이메일
            type: DataTypes.STRING(50),
            allowNull: true,        
        },
        github: {   //깃허브 주소
            type: DataTypes.STRING,
            allowNull: true,        
        },
        
    }, {
        timestamps: true,
        paranoid: true,
    })
);