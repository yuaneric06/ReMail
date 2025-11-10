const hidden = require("./hidden.js")
const express = require("express");
const app = express();

const cors = require("cors");
const corsOptions = {
    origin: ["http://localhost:5173"]
};
const databasePassword = hidden.default.databasePass;
// app.use(cors(corsOptions));
app.use(cors());

app.use(express.json());

let mysql = require('mysql2');
let pool = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "apponix",
    password: `${databasePassword}`
})

module.exports = pool;

pool.connect(function (err) {
    if (err) throw err;
    console.log("Connected to mysql database!");
})

app.get("/users/:uid/mail", (req, webRes) => {
    const uid = req.params.uid;
    console.log("Requested user: ", uid);
    pool.query(`SELECT * FROM remail.mail WHERE receiver_id = ${uid};`, (err, res, fields) => {
        if (err) throw err;
        webRes.json(res);
    })
});

app.get("/users/:uid", (req, webRes) => {
    const uid = req.params.uid;
    console.log("requesting username from ", uid);
    pool.query(`SELECT username FROM remail.users WHERE user_id = ${uid};`, (err, res, fields) => {
        if (err) throw err;
        webRes.json(res);
    })
});

app.get("/mail/:id", (req, webRes) => {
    const id = req.params.id;
    pool.query(`SELECT users.username, mail.receiver_id, mail.time_sent, mail.title, mail.content FROM remail.mail 
        INNER JOIN remail.users ON mail.sender_id = users.user_id
        WHERE mail.id = ${id};`, (err, res, fields) => {
            if (err) throw err;
            webRes.json(res);
        })
})

app.post("/mail", (req, webRes) => {
    console.log("Received post request at /mail, inserting into ReMail.mail: ", req.body);
    const mail = req.body;
    pool.query(`INSERT INTO remail.mail (sender_id, receiver_id, time_sent, title, content) 
        VALUES (${mail.sender_id}, 
        ${mail.receiver_id}, 
        '${mail.time_sent}', 
        '${mail.title}', 
        '${mail.content}');`,
        (err, res, fields) => {
            if (err) throw err;
            webRes.json(res);
        })
})

app.listen(8080, () => {
    console.log("Server started on port 8080");
});