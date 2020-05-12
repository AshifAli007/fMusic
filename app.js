const express = require("express");
var _ = require('lodash');
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

// mongoose.connect("mongodb+srv://admin-ashif:1997*Fira@cluster0-lfttz.mongodb.net/fMusic",{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.connect("mongodb://localhost:27017/fMusic",{useNewUrlParser:true,useUnifiedTopology:true});
const playlistSchema = new mongoose.Schema({
    file : Object,
    image : Object
});
const playlistrecordSchema = new mongoose.Schema({
    playlistName : String
});
var Playlistrecord  = new mongoose.model("playlistrecord",playlistrecordSchema);
var Playlist = new mongoose.model("playlist",playlistSchema);
app.get("/",function(req,res){
    res.redirect("/music/ashif");
});

app.get("/music/:playlistName",function(req,res){
    var playlistName = (req.params.playlistName).toLowerCase();
    Playlist = new mongoose.model(playlistName,playlistSchema);
    playlistName = _.capitalize(playlistName);
    Playlistrecord.find({playlistName : playlistName},function(err,name){
            if(!err){
                if(name==""){
                    var newrecord = new Playlistrecord({
                        playlistName : playlistName
                    });
                    newrecord.save();
                }
            }else{
                res.send(err);
            }
    });
    var playlistRecord;
    Playlistrecord.find(function(err,obj){
        if(!err){
            playlistRecord = obj;
        }
    });
    Playlist.find(function(err,playlist){
        if(!err){
            res.render("music",{Playlist:playlist,playlistName:playlistName,Playlistrecord:playlistRecord});
        }else{
            res.send(err);
        }
    });
    
});
var songUpload = upload.fields([{name:"myfile",maxCount:1},{name:"image",maxCount:1}]);
app.post('/music/:playlistName', songUpload, (req, res) => {
    var playlistName = (req.params.playlistName).toLowerCase();
    Playlist = new mongoose.model(playlistName,playlistSchema); 
    var music = new Playlist({
        file : req.files["myfile"][0],
        image : req.files["image"][0]
    });
    music.save();
    res.redirect("/music/"+playlistName);
});
// app.post('/music', upload.single('myfile'), (req, res) => {
//     var music = new Playlist({
//         file : req.file
//     });
//     music.save();
//     res.send(req.file);
// });

app.get("/add/:playlistName",function(req,res){
    var playlistName = (req.params.playlistName).toLowerCase();
    var playlistNameCapital = _.capitalize(playlistName);
    res.render("add",{playlistName:playlistName,playlistNameCapital:playlistNameCapital});
});
app.post("/add",function(req,res){
    var playlistName = (req.body.playlistName).toLowerCase();
    res.redirect("/add/"+playlistName);
});
app.listen(process.env.PORT||3000,function(){
    console.log("Server Is Running");
});



