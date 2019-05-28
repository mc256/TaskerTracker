const Sequelize = require('sequelize');
const db = require('./database').db;

module.exports = {
    db: db.define('location', {
        name: Sequelize.STRING(64),
        ip: Sequelize.STRING(39),
        timestamp: Sequelize.DATE
    },{
        timestamps: false
    })
};