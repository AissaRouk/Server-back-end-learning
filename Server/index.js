const mysql = require("mysql");
const express = require("express");
var app = express();
const cors = require("cors");

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "User_Database",
  port: 3307,
});

mysqlConnection.connect((err) => {
  if (err) console.log("DB Connection failed \n Error: " + JSON.stringify(err));
  else console.log("DB connection succeded");
});

app.listen(3001, () => console.log("Server running on https://localhost:3001"));

app.get("/api/get", (req, res) => {
  mysqlConnection.query("SELECT * FROM `newuser`", (err, rows, fields) => {
    console.log("Queryy!!");
    if (!err) res.send(JSON.stringify(rows));
    else console.log(err);
  });
});

app.get("/", (req, res) => {
  res.send("Hello world!");
});

app.post("/api/post", (req, res) => {
  const { UserEmail, UserPw } = req.body;
  mysqlConnection.query(
    "INSERT INTO `newuser`(`UserEmail`, `UserPw`) VALUES (?,?)",
    [UserEmail, UserPw],
    (error, result) => {
      if (error) console.log("Error in the post: " + error);
      else console.log("Posted sucessfully");
    }
  );
});

app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { UserEmail, UserPw } = req.body;

  mysqlConnection.query(
    "UPDATE `newuser` SET `UserEmail`=?,`UserPw`=? WHERE UserID=?",
    [UserEmail, UserPw, id],
    (err, rows) => {
      if (err) throw err;
      res.send(rows);
    }
  );
});

app.delete("/api/delete/:id", (req, res) => {
  const { id } = req.params;

  mysqlConnection.query(
    "DELETE FROM newuser WHERE `UserID` = ?",
    [id],
    (error, result) => {
      if (error) console.log("error when submitted: " + JSON.stringify(error));
      else console.log("deleted successfully");
    }
  );
});

// app.post("/api/insert", (req, res) => {
//   const email = req.body.email;
//   const userPWD = req.body.userPWD;
//   mysqlConnection.query(
//     "INSERT INTO `newuser`(`UserEmail`, `UserPw`) VALUES (?,?)",
//     [email, userPWD],
//     (err, result) => {
//       if (err) {
//         console.log("Insert Failed, " + JSON.stringify(err));
//       } else {
//         console.log("Inserted Sucesfully " + result);
//       }
//     }
//   );
// });
