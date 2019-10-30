module.exports = (sequelize, DataTypes)=>{
    return sequelize.define('question',{ 
        title: {
            type: DataTypes.STRING(150),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING(1000),
            allowNull: false,
        },
        createdAt:{
            type: DataTypes.STRING(200),
            allowNull: false,
        }
    },{
        timestamps: true, // 3번째 파라미터 ( 옵션 )
        paranoid: true,  // createdAt, updatedAt, deleteAt 컬럼이 자동으로 생겨서 알아서 데이터 넣어줌
    })
};
