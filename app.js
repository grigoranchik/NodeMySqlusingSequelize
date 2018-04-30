let mysql = require('mysql');
let express = require('express');
let app = express();

let connection = mysql.createConnection({
    host: 'localhost',
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
            console.log('Query was ok' );
            for(var i in rows){
                str += '<br>' + rows[i].LastName + '<a href="/del?LastName=' + rows[i].LastName + '">-</a>';/* +
                    ' <a href="/editfrom?PersonID="' + rows[i].PersonID + '&LastName=' + rows[i].LastName + '&FirstName=' +
                    rows[i].FirstName + '&Address=' + rows[i].Address + '&City=' + rows[i].City + ' > !</a>'; */
            };
            res.send(str);
        }
        else{
            console.log('Error while performing query:' + err);
        }

    });
});

app.get('/form', function (req, res) {
    var str = '<form action="/add" method="get">' +
        '<input type="text" name="PersonID">' +
        '<input type="text" name="LastName">' +
        '<input type="text" name="FirstName">' +
        '<input type="text" name="Address">' +
        '<input type="text" name="City">' +
        '<input type="submit">' +
        '</form>';
    res.send(str);
});

app.get('/add', function (req, res) {
    //console.log(req.query.PersonID, req.query.LastName, req.query.FirstName, req.query.Address, req.query.City);
    connection.query('insert into persons (PersonID, LastName, FirstName, Address, City) values ('+ req.query.PersonID +' ,'+ req.query.LastName +' , '+ req.query.FirstName +', '+ req.query.Address +', '+ req.query.City +')',
        function(err, rows, fields){
        if(!err){
            res.send('ready');
        } else
            console.log('Error while performing query');
    })
});

app.get('/del', function (req, res) {
    console.log('LastName:' + req.query.LastName);

    var query = "delete from persons where LastName='" + req.query.LastName+"'";
    console.info("Running: " + query);
    connection.query(query, function (err, rows, fields) {
        if(!err){
            console.log('ready');
            //
        } else{
            console.log('Error while performing query');
            //res.end();
        }
    });
});


app.listen(3000, function () {
    console.log('Connection Node-Server are successful');
})