const express = require("express");
const app = express();
const path = require("path");
const ejs = require("ejs");
const collection1 = require("mongodb");
const bodyParser = require("body-parser");
const cookieParser =require('cookie-parser');
app.set("view engine", "ejs");
const mongoose = require("mongoose");
const { validateHeaderName } = require("http");

mongoose.connect("mongodb://127.0.0.1:27017/foodsco", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const SignUpSchema = new mongoose.Schema({
    username: String,
    password: String,
    email: String
})

const Contactus = new mongoose.Schema({
    name: String,
    email_c: String,
    number: Number,
    subject: String,
    message: String
})

const priceSchema = {
    product: String,
    price: String,
    image: String
}

const price = mongoose.model('price', priceSchema);

const Users = new mongoose.model('Users', SignUpSchema);
const contact = new mongoose.model('contact', Contactus);
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


app.post("/formex1", async function (req, res) {
    const uname = req.body.username;
    const pass = req.body.password;
    const em = req.body.email;
    try {
        const result = await Users.insertMany({
            username: uname, password: pass, email: em,
        });
        if (result) {
            res.render('homepage.ejs', { uname: req.body.username });
        } else {
            res.render('signup.ejs');
        }
    } catch (err) {
        console.log(err);
        res.send("Error occurred");
    }
});

app.post("/contact-form", async function (req, res) {
    const name = req.body.name;
    const email_c = req.body.email;
    const number = req.body.number;
    const subject = req.body.subject;
    const remark = req.body.message;
    try {
        const result = await contact.insertMany({
            name: name, email_c: email_c, number: number, subject: subject, message: remark
        });

        res.render('contact.ejs');

    } catch (err) {
        console.log(err);
        res.send("Error occurred");
    }
});

app.post("/form2", async (req, res) => {
    try {
        const check = await Users.findOne({ username: req.body.username });
        if (check.password == req.body.password) {
            res.cookie('user_name',req.body.username);
            res.render("homepage.ejs", { uname: req.cookies.user_name });
            console.log(req.cookies);
        } else {
            res.send("wrong password");
        }
    } catch {
        res.send("Wrong details");
    }
});

app.get("/", function (req, res) {
    res.render('signup.ejs');
});

app.get("/signup.ejs", function (req, res) {
    res.render('signup.ejs');
});

app.get('/login.ejs', function (req, res) {
    res.clearCookie('user_name');
    res.render('login.ejs');
});

app.get('/homepage.ejs', function (req, res) {
    res.render('homepage.ejs', { uname:req.cookies.user_name });
});


// app.get('/shop.ejs', function (req, res) {
//     res.render('shop.ejs');
// });

app.get('/shop.ejs', async function(req, res)  {

    try {
        const prices = await price.find({});
        res.render('shop.ejs', { prices });
      } catch (err) {
        console.error('Failed to fetch users from MongoDB', err);
        res.status(500).send('Internal Server Error');
      }
    });

app.get('/contact.ejs', function (req, res) {
    res.render('contact.ejs');
});

app.get('/cart.ejs', function (req, res) {
    res.render('cart.ejs');
});

app.listen(3000, function () {
    console.log("server started at 3000");
});