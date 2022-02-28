const express = require('express');
const database = require('./database')
const migration = require('./migration');
const app = express();

const port = 3000;

migration.migrate();

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

app.get('/', async (req, res) => {
    const connection = database.connect();
    await insertName(connection);
    const names = await getNames(connection);
    connection.end();

    res.send(`<section>
        <h1>Full Cycle Rocks!</h1>
        <ul>${names.map(({name}) => `<li>${name}</li>`).join('')}</ul>
    </section>`);
});


app.listen(port, () => {
    console.log('Running at '+ port);
})