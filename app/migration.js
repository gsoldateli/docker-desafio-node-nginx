const database = require('./database');


module.exports = {
    migrate: () => {
        const connection = database.connect();

        console.log('Running migrations... \n');
        connection.query(`CREATE TABLE IF NOT EXISTS people( name VARCHAR(30) NOT NULL );`);
        connection.end();
        
    }
}