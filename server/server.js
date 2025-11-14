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
});

module.exports = pool;

pool.connect(function (err) {
    if (err) throw err;
    console.log("Connected to mysql database!");
});

/**
 * /users/:uid/mail
 * returns all mail sent to specified user
 */
app.get("/users/:uid/mail", (req, webRes) => {
    const uid = req.params.uid;
    console.log("Requested user: ", uid);
    pool.query(`SELECT * FROM remail.mail WHERE receiver_id = ${uid};`, (err, res, fields) => {
        if (err) throw err;
        webRes.json(res);
    })
});

/**
 * /mail, takes in {receiverID, senderID}
 */
app.get("/mail", (req, webRes) => {
    console.log(req);
    const {receiverID, senderID} = req.query;
    console.log("querying mail with ruid: ", receiverID, " suid: ", senderID);
    pool.query(`SELECT id FROM remail.mail WHERE sender_id = ${senderID} AND receiver_id = ${receiverID};`, (err, res, fields) => {
        if (err) throw err;
        webRes.json(res);
    })
});


/**
 * /users/:uid
 * returns username for userID if inputted uid
 * returns uid for username if inputted username
 */
app.get("/users/:uid", (req, webRes) => {
    const uid = Number.parseInt(req.params.uid);
    console.log("requesting username from ", uid);
    if (isNaN(uid)) {
        console.log("requesting type: username");
        pool.query(`SELECT user_id FROM remail.users WHERE username = '${req.params.uid}';`, (err, res, fields) => {
            if (err) throw err;
            webRes.json(res);
        })
    }
    else {
        console.log("requesting type: uid");
        pool.query(`SELECT username FROM remail.users WHERE user_id = ${uid};`, (err, res, fields) => {
            if (err) throw err;
            webRes.json(res);
        })
    }
});

/**
 * /mail/:id
 * returns mail entry for specified mail ID
 */
app.get("/mail/:id", (req, webRes) => {
    const id = req.params.id;
    pool.query(`SELECT users.username, mail.receiver_id, mail.time_sent, mail.title, mail.content FROM remail.mail 
        INNER JOIN remail.users ON mail.sender_id = users.user_id
        WHERE mail.id = ${id};`, (err, res, fields) => {
            if (err) throw err;
            webRes.json(res);
        })
});

/**
 * /mail
 * inserts mail row into remail.mail
 */
app.post("/mail", (req, webRes) => {
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
});

app.post("/register", (req, webRes) => {
    const { username, password } = req.body.params;
    console.log("received params: ");
    console.log(req.body);
    console.log("username, password: ", username, " ", password);
    pool.query(`INSERT INTO remail.users (username, passwd) VALUES ('${username}', '${password}');`, (res, err, fields) => {
        if (err) throw err;
        webRes.json(res);
    })
});

app.post("/login", (req, webRes) => {
    const { username, password } = req.body;
    console.log("logging in, username, password: ", username, " ", password);
    pool.query(`SELECT user_id FROM remail.users WHERE username="${username}" AND passwd="${password}";`, (res, err, fields) => {
        if (err) throw err;
        webRes.json(res);
    })
})

app.listen(8080, () => {
    console.log("Server started on port 8080");
});