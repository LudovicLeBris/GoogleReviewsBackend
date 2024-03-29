module.exports = (sequelize, DataTypes) => {
    return sequelize.define('Reviews', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        authorName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        authorImage: {
            type: DataTypes.STRING,
            allowNull: false
        },
        authorUri: {
            type: DataTypes.STRING,
            allowNull: false
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        publishedDate: {
            type: DataTypes.DATE,
            allowNull: false
        },
        content: {
            type: DataTypes.TEXT
        }
    },
    {
        timestamps: true,
        updatedAt: false
    }
)}