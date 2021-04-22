const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const mysql = require('mysql');
var cors = require('cors');

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
// create application/json parser
var jsonParser = bodyParser.json()


/*
    const selectEtudiant = () => {
        const student = db.query("SELECT * FROM etudiant");
        console.log(student);
    };
    selectEtudiant();
        db.query("INSERT INTO etudiant (nom, prenom) VALUES ('deuxieme', 'prenom')", function (err, rows, fields) {
        console.log("j'ai fait une requete");
    });


*/
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

app.get('/student/:id', async function(req, res) {
 
    var id = req.params.id;

    db.query("SELECT * FROM convention WHERE convention.idConvention = '" + escape(id) + "'", function (error, results) {
        if (error) throw error;
        res.send(results);
    });
});

app.listen(3001, () => {
    console.log("running on port 3001");
});

