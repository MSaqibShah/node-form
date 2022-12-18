const express = require("express");
const app = express();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "formdb",
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to database");
  }
});

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", (req, res) => {
  const table = "entry";
  const name = req.body.user_name;
  const email = req.body.user_email;
  const message = req.body.user_message;
  var sql = `INSERT INTO ${table} VALUES ("${name}","${email}", "${message}");`;

  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log("1 record inserted");
    }
  });

  return res.redirect("/");
});

app.get("/messages", (req, res) => {
  var sql = `select * from entry;`;
  connection.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
      return res.render("messages", { data: result });
    }
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
