const express = require("express");
const app = express();
const port = 3000;
const md5 = require("md5");
const session = require("express-session");
const path = require("path");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

// expose static path
app.use(express.static(path.join(__dirname, "static")));

// set view engine
app.set("view engine", "ejs");

//initialize session
app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// route pages
app.get("/", (req, res) => {
    get_index(req, res);
});
app.get("/products", (req, res) => {
    get_products(req, res);
});
app.get("/services", (req, res) => {
    get_services(req, res);
});
app.get("/contact", (req, res) => {
    get_contact(req, res);
});
app.get("/about", (req, res) => {
    get_about(req, res);
});
app.get("/account", (req, res) => {
    get_account(req, res);
});
app.get("/login", (req, res) => {
    get_login(req, res);
});
app.get("/register", (req, res) => {
    get_register(req, res);
});
app.get("/logout", (req, res) => {
    get_logout(req, res);
});

function get_index(req, res) {
    res.render("pages/index", {
        loggedin: req.session.loggedin,
    });
}

function get_products(req, res) {
    res.render("pages/products", {
        loggedin: req.session.loggedin,
    });
}

function get_services(req, res) {
    res.render("pages/services", {
        loggedin: req.session.loggedin,
    });
}

function get_contact(req, res) {
    res.render("pages/contact", {
        loggedin: req.session.loggedin,
    });
}

function get_about(req, res) {
    res.render("pages/about", {
        loggedin: req.session.loggedin,
    });
}

function get_account(req, res) {
    //check if user is logged in
    if (req.session.loggedin) {
        show_account(req, res, req.session.userID);
    } else {
        get_login(req, res);
    }
}

function show_account(req, res, user_id) {
    let user = null;

    connection.query(
        "select * from `accounts` where id = ?",
        [user_id],
        function (error, results, fields) {
            if (error) throw error;
            if (results.length > 0) {
                //user found
                user = results[0];

                //don't supply password hash ;)
                delete user.password;
                res.render("pages/account", {
                    user: user,
                    loggedin: req.session.loggedin,
                });
                res.end();
            } else {
                //invalid userID
                console.log("Kein User Gefunden. Hurensohn");
            }
        }
    );
}

function get_login(req, res) {
    //check if user is logged in
    if (req.session.loggedin) {
        show_account(req, res, req.session.userID);
    } else {
        res.render("pages/login", {
            loggedin: req.session.loggedin,
        });
    }
}

function get_register(req, res) {
    //check if user is logged in
    if (req.session.loggedin) {
        show_account(req, res, req.session.userID);
    } else {
        res.render("pages/register", {
            loggedin: req.session.loggedin,
        });
    }
}

function get_logout(req, res) {
    //check if user is logged in
    if (req.session.loggedin) {
        do_logout(req, res);
    } else {
        get_login(req, res);
    }
}

function do_logout(req, res) {
    //close session
    req.session.username = null;
    req.session.userID = null;
    req.session.password = null;
    req.session.loggedin = false;

    get_index(req, res);
}

function get_error(req, res) {}

// host app on port xxxx
app.listen(port, () => {
    console.log(`App listening at port ${port}`);
    console.log("http://localhost:" + port + "/");
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
                req.session.loggedin = true;
                req.session.username = username;
                req.session.userID = results[0].id;

                // render home page
                get_account(req, res);
            } else {
                get_index(res, req);
                res.end();
            }
        }
    );
});

app.post("/register", encoder, function (req, res) {
    var email = req.body.email;
    var firstname = req.body.firstname;
    var lastname = req.body.lastname;
    var username = req.body.username;
    var password = md5(req.body.password);

    connection.query(
        "SELECT * FROM accounts WHERE username = ?",
        [username],
        function (error, results, fields) {
            // If there is an issue with the query, output the error
            if (error) throw error;
            // If the account exists
            if (results.length > 0) {
                //user already exists, skip login
                get_index(req, res);
            } else {
                connection.query(
                    "INSERT INTO accounts (email, firstname, lastname, username, password) VALUES (?,?,?,?,?)",
                    [email, firstname, lastname, username, password],
                    function (error, results, fields) {
                        // If there is an issue with the query, output the error
                        if (error) throw error;
                        // account added
                        req.session.loggedin = true;
                        req.session.username = username;
                        req.session.userID = results.insertId;

                        // render home page
                        get_account(req, res);
                    }
                );
            }
        }
    );
});
