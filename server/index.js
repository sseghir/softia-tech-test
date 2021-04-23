const express = require('express');
const app = express();
const mysql = require('mysql');
var cors = require('cors');

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 
}

app.use(cors(corsOptions));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12Sabrina34!',
    database: "formationplussoftia",
});
db.connect();

app.get('/', function (req, res) {

    db.query("SELECT * FROM etudiant", function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
});

app.get('/convention/:id', async function(req, res) {
 
    var id = req.params.id;

    db.query("SELECT * FROM convention WHERE convention.idConvention = '" + escape(id) + "'", function (error, results) {
        if (error) throw error;
        res.send(results);
    });
});

app.get('/student/:id', async function(req, res) {
 
    var id = req.params.id;

    db.query("SELECT * FROM etudiant WHERE etudiant.idEtudiant = '" + escape(id) + "'", function (error, results) {
        if (error) throw error;
        res.send(results);
    });
});

app.get('/attestation/:id/:idConvention/:message', async function(req, res) {
 
    var id = req.params.id;
    var idConvention = req.params.idConvention;
    var message = req.params.message;
    
    db.query("INSERT INTO attestation (Etudiant, Convention, message) VALUES (" + escape(id) + "," + escape(idConvention) + "," + "\"" + escape(message) + "\"" + ")", function (error, results) {
        if (error) throw error;
        res.send(results);
    });
});

app.listen(3001, () => {
    console.log("running on port 3001");
});