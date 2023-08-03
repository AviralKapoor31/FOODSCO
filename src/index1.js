const express = require("express"); 
const app = express();
const path = require("path");
const ejs = require("ejs");
const collection1 = require("mongodb");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

app.use(express.json());
app.set("view engine", "ejs");
app.use('/css', express.static('public'));
app.use('/js', express.static('public'));
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb://localhost:27017/foodsco", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const SignUpSchema= new mongoose.Schema({
    username:String,
    password:String,
    email:String
})

const Users=new mongoose.model('Users',SignUpSchema);

app.get("/signup.html", (req, res) => {
  res.render("signup");
});

app.post("/formex1", async (req, res) => {
  const uname = req.body.username;
    const pass = req.body.password;
    const em = req.body.email; 
    try {
    const result = await Users.insertMany({ Username : uname , Password : pass, Email : em, 
   });
    if (result) {
    res.render('homepage.ejs');
    } else {
    res.render('signup.ejs');
    }
    }catch (err) {
    console.log(err);
    res.send("Error occurred");
    }
});

app.get("/", (req, res) => {
  res.render("login"); 
});

app.post("/login", async (req, res) => {
  try {
    const check = await collection1.findOne({ name: req.body.name });
    if (check.password === req.body.password) {
      res.render("homepage.ejs");
    } else {
      res.send("Wrong password");
    }
  } catch {
    res.send("Wrong details");
  }
});

app.get('/homepage.ejs', function(req, res) {
  res.render('homepage.ejs');
});

app.get('/shop.ejs', function(req, res) {
  res.render('shop.ejs');
});

app.get('/contact.ejs', function(req, res) {
  res.render('contact.ejs');
});

app.get('/cart.ejs', function(req, res) {
  res.render('cart.ejs');
});

// app.get('/login.ejs', function(req, res) {
//   res.render('login.ejs');
// });

// app.get('/signup.ejs', function(req, res) {
//   res.render('signup.ejs');
// });

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
