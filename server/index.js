const express = require('express');
const app = express();
const mysql = require('mysql');
var cors = require('cors');

var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
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

app.get('/', function (req, res) {

    const db = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '12Sabrina34!',
        database: "formationplussoftia",
    });
    db.connect();
    db.query("SELECT * FROM etudiant", function (error, results, fields) {
        if (error) throw error;
        res.send(results);
    });
    db.end();
});

app.listen(3001, () => {
    console.log("running on port 3001");
});

