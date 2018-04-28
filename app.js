let mysql = require('mysql');
let express = require('express');
let app = express();

let connection = mysql.createConnection({
    hosr: 'localhost',
    user: 'root',
    password: '',
    database: 'grisha',
    port: '3306'
});

connection.connect(function (err) {
    if(!err){
        console.log('Database is connected');
    } else{
        console.log('Error connection database:' + err);
    }
});


app.get('/list', function (req,res) {
    var str='';
    connection.query('SELECT * FROM persons', function (err, rows, fields) {
        if(!err){
            for(var i in rows){
                str += rows[i].LastName + '<br>';
            };
            res.send(str);
        }
        else{
            console.log('Error while performing query');
        }

    });
});


app.listen(3000, function () {
    console.log('Connection Node-Server are successful');
})