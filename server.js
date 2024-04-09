if (process.env.NODE_ENV !== 'production'){
    require('dotenv').config()
}
  
const express = require('express')
const app = express();
const mysql = require('mysql')
const cors = require('cors')

const PORT = 3000


app.use(cors({
    origin: 'http://localhost:8080' // Specify the allowed origin
}));

/* --                                                MYSQL                                                                -- */

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: 'aax0108fukg',
    database: "user",
    multipleStatements: true
});

connection.connect((err) => {
    if (!err) {
        console.log("Connected to the server");
    } else {
        console.log("Conection to server failed, ",err);
    }
});


/* --                                                SERVER                                                                -- */

app.listen(PORT, 'localhost', () => {
    console.log(`Server running on port ${PORT}`)
})


app.get('/word', (req, res) => {
    connection.query("SELECT * FROM jlpt.n5", (err, result, fields) => {
        if (err)  throw err

        const word = result[20].kanj
        
        res.json({ word })
    
    })
})
