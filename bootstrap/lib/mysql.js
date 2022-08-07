const createPool  = require("mysql2/promise").createPool;
const RowDataPacket = require("mysql2/promise").RowDataPacket;


const db = createPool({
    host: process.env.DB_HOST || "localhost",
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "12345678",
    database: process.env.DB_NAME || "reviewr",
});

var query = function (sql, values) {
    return db
        .execute(sql, values)
        .then(function (value) {
        return value[0];
    })
        .catch(function (reason) {
        var sqlMessage = reason.sqlMessage;
        throw new Error(sqlMessage);
    });
};
exports.query = query;