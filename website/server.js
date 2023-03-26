const express = require("express");
const app = express();
const port = 3000;
const path = require("path");

app.use(express.static(path.join(__dirname, "static")));
app.set("view engine", "ejs");

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
app.listen(port, () => {
    console.log(`App listening at port ${port}`);
});
