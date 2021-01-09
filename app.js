//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

var posts=[];
const homeStartingContent = "Hi there!! I am Saikat Paul. Here I post my day to day blogs and activities that I like to share among my friend circle.";
const aboutContent = "Ummmm... Currently I am pursuing B.Tech in ECE from RCC Institute of Information Technology. I will add more stuffs here as soon as I figure out the current status of my life xD";
const contactContent = "Email : paulsaikat8364@gmail.com Mobile : 9836404108";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/",function(req,res){
  res.render("home",{startingCotent:homeStartingContent,content:posts});
});

app.get("/about",function(req,res){
  res.render("about",{aboutCont:aboutContent});
});

app.get("/contact",function(req,res){
  res.render("contact",{contactCont:contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});


app.post("/compose",function(req,res){
  var body=req.body.postBody;
  var post = {title:req.body.postTitle,content:req.body.postBody};
  posts.push(post);
  res.redirect("/")
});


app.get("/posts/:postName",function(req,res){
  var requiredTitle = _.lowerCase(req.params.postName)
  console.log(requiredTitle);
  posts.forEach(function(post){
    var gotTitle = _.lowerCase(post.title)
    if(gotTitle===requiredTitle){
      res.render("post",{postTitle:post.title,postBody:post.content});
    }
  });
});












app.listen(process.env.PORT || 3000, function() {
  console.log("Server started on port 3000");
});
