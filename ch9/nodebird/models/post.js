module.exports = (sequelize, DataTypes) => (
    sequelize.define('post',
    {
        connect: {
            type: DataTypes.STRING(140),
            allowNull: false,    
        },
        img: {
            type: DataTypes.STRING(200),
            allowNull: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
    })
);
        
    
        