const express = require('express');
const mysql = require('mysql');
const migration = require('./migration');
const app = express();


migration.migrate();
const config = {
    host: 'db',
    user: 'root',
    password: 'nodedb',
    database: 'nodedb'
};

const generateName = () => {
    const names = ['Wesley', 'Gabriel', 'Guilherme', 'Docker'];
    const randomIndex = Math.round(Math.random() * names.length - 1);

    return names[Math.max(randomIndex, 0)];

}

const insertName = (connection) => {
    const sql = `INSERT INTO people(name) values ('${generateName()}');`;
    
    return new Promise(result => connection.query(sql, (error, data) => {
        if (error) throw error;

        result(data);
    })) 
}

const getNames = async (connection) => {
    const sql = `SELECT name from people;`;
    


    return new Promise((resolve) => {
        return connection.query(sql, (error, results) => {
            resolve(results);
        });
    })
    
}



const port = 3000;



app.get('/', async (req, res) => {
    const connection = mysql.createConnection(config);
    await insertName(connection);
    const names = await getNames(connection);
    console.log(names);
    connection.end();
    res.send(`<section>
        <h1>Full Cycle Rocks!</h1>
        <ul>${names.map(({name}) => `<li>${name}</li>`).join('')}</ul>
    </section>`);
});


app.listen(port, () => {
    console.log('Running at '+ port);
})