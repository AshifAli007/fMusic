const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");
app.use(express.static(__dirname));
app.use(bodyParser.urlencoded({extended:true}));
app.set("view engine","ejs");
app.use(express.static("public"));

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, path.join(__dirname, '/uploads/'));
     },
    filename: function (req, file, cb) {
        cb(null , file.originalname);
    }
});
var upload = multer({ storage: storage });

mongoose.connect("mongodb://localhost:27017/fMusic",{useNewUrlParser:true,useUnifiedTopology:true});
const playlistSchema = new mongoose.Schema({
    file:Object
});
const Playlist = new mongoose.model("playlist",playlistSchema);
app.get("/",function(req,res){
    res.render("home");
});

app.get("/music",function(req,res){
    Playlist.find(function(err,playlist){
        if(!err){
            res.render("music",{Playlist:playlist});
        }else{
            res.send(err);
        }
    });
    
});
app.post('/music', upload.single('myfile'), (req, res) => {
    var music = new Playlist({
        file : req.file
    });
    music.save();
    res.send(req.file);

    console.log(req.file);
});

app.get("/add",function(req,res){
    res.render("add");
});

app.listen(3000,function(){
    console.log("Server Started On Port 3000");
});



