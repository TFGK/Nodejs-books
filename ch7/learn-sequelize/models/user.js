module.exports = (sequelize, DataTypes) => {

    //users table과 매핑
    return sequelize.define('user', {
        // 키 === 칼럼명, 필드명
        name: {
            type: DataTypes.STRING(20),
            allowNull: false, // not null
            unique: true,
        },
        age: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
        },
        married: {
            type: DataTypes.BOOLEAN,
            allowNull: false, 
        },
        comment: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue:DataTypes.NOW
        }
    }, {
        timestamps: false
    });
};