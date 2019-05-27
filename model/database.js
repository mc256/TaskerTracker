const dbLibrary = require('sequelize');
const db = {
    db: new dbLibrary(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASS,
        {
            host: process.env.DB_HOST,
            dialect: "mysql",
            pool: {
                max: 30,
                min: 0
            },
            logging: process.env.DB_LOGS === 'true'
        }
    ),
    initialize: (alter = false) => {
        require('./log').db.sync({alter: alter});
    }
};

module.exports = db;