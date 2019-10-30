module.exports = (sequelize, DataTypes) => (
    sequelize.define('post',
    {               
        id: {       //아이디
            type: DataTypes.STRING,
            primaryKey: true,
        },
        title: {    //제목
            type: DataTypes.STRING(25),
            allowNull: false,
            unique: true,
        },
        picture: {  //사진
            type: DataTypes.BLOB,
            allowNull: false,
        },
        content: {  //내용
            type: DataTypes.STRING,
            allowNull: false,
        }
    }, {
        timestamps: true,
        paranoid: true,
    })
);
        