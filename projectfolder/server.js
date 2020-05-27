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
  multipleStatements: true,
});

app.use(cors()); //Cross Origin Resource Sharing

connection.connect();

app.get("/", (req, res) => {
  res.send("hello world!");
});

app.get("/api/book/:shelf_num", (req, res) => {
  connection.query(
    `SELECT * FROM BOOK WHERE shelf_num=${req.query.shelf_num}`,
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.get("/api/shelf/:id", (req, res) => {
  const id = req.query.user_id;
  connection.query(
    `SELECT * FROM BookShelf WHERE user_id="${id}"`,
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.post("/api/shelf", (req, res) => {
  const sql = "INSERT INTO BookShelf VALUES (?, null, ?)";
  const id = req.query.user_id;
  const shelf_name = req.query.shelf_name;
  const params = [id, shelf_name];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

app.post("/api/book", (req, res) => {
  let sql = "INSERT INTO BOOK VALUES (null, ?, ?, ?, ?, ?, ?, ?)";
  let image = req.body.image;
  let title = req.body.title;
  let author = req.body.author;
  let publisher = req.body.publisher;
  let price = req.body.price;
  let user_id = req.body.user_id;
  let shelf_num = req.body.shelf_num;
  let params = [image, title, author, publisher, price, user_id, shelf_num];
  connection.query(sql, params, (err, rows, fields) => {
    res.send(rows);
  });
});

app.post("/api/sign", (req, res) => {
  console.log(req.body.data.pass);
  let sql =
    "SELECT * FROM register WHERE ID='" +
    req.body.data.email +
    "' and private_key='" +
    req.body.data.pass +
    "'";
  let email = req.body.data.email;
  let password = req.body.data.pass;
  //let usernameRegex = /^[a-z0-9]+$/;
  let params = [email, password];
  console.log(params);

  connection.query(sql, params, (err, rows, fields) => {
    if (err) {
      throw err;
    }
    if (rows.length > 0) {
      console.log(rows[0].ID);
      return res.json({ loginresult: true, name: rows[0].ID });
    } else {
      console.log("f3");
      return res.send({ loginresult: false });
    }
  });
});

app.post("/api/register", (req, res) => {
  let sql = "INSERT INTO register VALUES (?,?)";
  let email2 = req.body.email2;
  let password2 = req.body.password2;
  //let usernameRegex = /^[a-z0-9]+$/;
  let params = [email2, password2];
  console.log(params);

  connection.query(sql, params, (err, rows, fields) => {
    if (!err) {
      res.send("success");
      console.log("not error");
    } else {
      console.log("error");
      return res.status(400).json({
        // HTTP 요청에 대한 리스폰스 (json 형식으로)
        error: "duplicate EMAIL",
        code: 1,
      });
    }
  });
});

app.delete("/api/shelf/:id", (req, res) => {
  const id = req.body.id;
  const shelf_num = req.body.shelf_num;
  params = [shelf_num, shelf_num];
  const sql =
    "DELETE FROM BookShelf WHERE shelf_num=?;DELETE FROM BOOK WHERE shelf_num=?";
  connection.query(sql, params, (err, rows, fields) => {
    if (err) {
      console.log(err);
    } else {
      console.log("delete done");
    }
  });
});

app.delete("/api/books/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM BOOK WHERE id=${id}`;
  connection.query(sql, (err, rows, fields) => {
    console.log("delete done");
  });
});

app.post("/api/books/:id", (req, res) => {
  const sql = `UPDATE BOOK SET title='${req.body.title}', author='${req.body.author}', publisher='${req.body.publisher}' WHERE id=${req.body.id}`;
  connection.query(sql, (err, rows, fields) => {
    console.log("edit done");
    if (err) {
      console.log(err);
    }
  });
});

app.listen(port, () => console.log(`Listening on port ${port}`));
