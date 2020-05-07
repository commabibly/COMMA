const fs = require("fs");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const data = fs.readFileSync("./database.json");
const conf = JSON.parse(data);

/*
//종호가 만든거
{
  "host": "comma.c6a76bjjinod.ap-northeast-2.rds.amazonaws.com",
  "user": "admin",
  "password": "papa6985!",
  "port": "3306",
  "database": "management"
}

{
  "host": "woodeng.csnc8dg1k5sn.ap-northeast-2.rds.amazonaws.com",
  "user": "admin",
  "password": "dnckd911216",
  "port": "3306",
  "database": "BOOKS"
}

*/

const mysql = require("mysql");

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  port: conf.port,
  database: conf.database,
});

app.use(cors()); //Cross Origin Resource Sharing

connection.connect();

app.get("/api/book", (req, res) => {
  connection.query("SELECT * FROM BOOK", (err, rows, fields) => {
    res.send(rows);
  });
});

app.post("/api/book", (req, res) => {
  let sql = "INSERT INTO BOOK VALUES (null, ?, ?, ?, ?, ?)";
  let image = req.body.image;
  let title = req.body.title;
  let author = req.body.author;
  let publisher = req.body.publisher;
  let price = req.body.price;
  let params = [image, title, author, publisher, price];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
