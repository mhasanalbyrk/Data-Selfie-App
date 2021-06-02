const express = require('express');
const DataStore = require('nedb');
const app = express();
const port = process.env.PORT || 3000;
// app.listen(3000, () => console.log('Listening at 3000'));
app.listen(port, () => console.log('Starting server at ${port}'));

app.use(express.static('public'));
app.use(express.json({limit: '1mb'}));

const database = new DataStore('database.db');
database.loadDatabase();
// database.insert({name: 'Redlag', status: 'logged'});


app.get('/api', (req, res) => {
    database.find({}, (err, data) => {
        if (err){
            res.end();
            return;
        }
        res.json(data);
    });

});

app.post('/api', (request, response) => {
    console.log('I got request!')
    console.log(request.body);

    const timestamp = Date.now();

    const data = request.body;
    data.timestamp = timestamp;
    database.insert(data);

    response.json(data);
});