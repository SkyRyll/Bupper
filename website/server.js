const express = require("express");
const app = express();
const port = 3000;
const md5 = require("md5");
const path = require("path");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

// expose static path
app.use(express.static(path.join(__dirname, "static")));
app.set("view engine", "ejs");

// route pages
app.get("/", (req, res) => {
    res.render("pages/index");
});
app.get("/products", (req, res) => {
    res.render("pages/products");
});
app.get("/services", (req, res) => {
    res.render("pages/services");
});
app.get("/contact", (req, res) => {
    res.render("pages/contact");
});
app.get("/about", (req, res) => {
    res.render("pages/about");
});
app.get("/account", (req, res) => {
    res.render("pages/account");
});
app.get("/login", (req, res) => {
    res.render("pages/login");
});
app.get("/register", (req, res) => {
    res.render("pages/register");
});

// host app on port xxxx
app.listen(port, () => {
    console.log(`App listening at port ${port}`);
});

//connect to local database
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "optik",
});

// connection test
connection.connect(function (error) {
    if (error) throw error;
    else console.log("connection to database successful");
});

//login check and redirect
app.post("/login", encoder, function (req, res) {
    var username = req.body.username;
    var password = md5(req.body.password);

    connection.query(
        "select * from accounts where username = ? and password = ?",
        [username, password],
        function (error, results, fields) {
            if (results.length > 0) {
                res.redirect("/account");
            } else {
                res.redirect("/");
            }
            res.end();
        }
    );
});
