const mysql = require('mysql');

const config = {
    host: 'db',
    user: 'root',
    password: 'nodedb',
    database: 'nodedb'
};

module.exports = {
    connect: () => mysql.createConnection(config)
}