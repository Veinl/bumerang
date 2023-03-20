'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Player extends Model {}
    Player.init(
        {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            name: {
                allowNull: false,
                type: DataTypes.TEXT,
            },
            team: {
                allowNull: false,
                type: DataTypes.TEXT,
            },
            time: {
                allowNull: false,
                type: DataTypes.FLOAT,
            },
            score: {
                allowNull: false,
                type: DataTypes.INTEGER,
            },
            createdAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: DataTypes.DATE,
            },
        },
        {
            sequelize,
            modelName: 'Player',
        },
    );
    return Player;
};
