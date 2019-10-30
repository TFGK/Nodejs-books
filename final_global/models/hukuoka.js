module.exports = (sequelize, DataTypes)=>{
    return sequelize.define('hukuoka',{ //posts 테이블이 생김
        img: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },title: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },content: {
            type: DataTypes.STRING(1000),
            allowNull: true,
        },
    },{
        timestamps: false, // 3번째 파라미터 ( 옵션 )
        paranoid: false,  // createdAt, updatedAt, deleteAt 컬럼이 자동으로 생겨서 알아서 데이터 넣어줌
    })
};
