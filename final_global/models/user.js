module.exports = (sequelize, DataTypes)=>
    sequelize.define('user',{ //users 테이블이 생김
        email: {
            type: DataTypes.STRING(40),
            allowNull: true,
            unique: true,
        },
        nick: {
            type: DataTypes.STRING(15),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        tel:{
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        provider: {
            type: DataTypes.STRING(10),
            allowNull: false,
            defaultValue: 'local',
        },
        snsId: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
    },{
        timestamps: true, // 3번째 파라미터 ( 옵션 )
        paranoid: true,  // createdAt, updatedAt, deleteAt 컬럼이 자동으로 생겨서 알아서 데이터 넣어줌
    })  
