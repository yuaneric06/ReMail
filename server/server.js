const express = require("express");
const app = express();

const cors = require("cors");
const corsOptions = {
    origin: ["http://localhost:5173"]
};
app.use(cors(corsOptions));

let mysql = require('mysql2');
let con = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "apponix",
    password: "BlueCheese"
})

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to mysql database!");
    con.query("SELECT * FROM parks_and_recreation.employee_demographics;", (err, res, fields) => {
        if (err) throw err;
        console.log(res);
    });
})

app.get("/api", (req, res) => {
    res.json({ "fruits": ["apple", "orange", "banana"] });
});

app.listen(8080, () => {
    console.log("Server started on port 8080");
});