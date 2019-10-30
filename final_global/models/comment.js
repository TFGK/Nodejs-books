module.exports = (sequelize, DataTypes)=>{
    return sequelize.define('comment',{ //comments 테이블이 생김
        key:{
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        created_at:{
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: DataTypes.NOW,
        },
    },{
        timestamps: true, // 3번째 파라미터 ( 옵션 )
    });
};
