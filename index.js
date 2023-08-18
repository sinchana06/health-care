var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")

const app = express()
app.use(bodyParser.json())
app.use(express.static('public'))
app.use(bodyParser.urlencoded({
    extended:true
}))

mongoose.connect('mongodb://127.0.0.1:27017/mydb');
var db = mongoose.connection;
db.on('error',()=>console.log("error connecting to db"));
db.once('open',()=>console.log('Connected to db'));
app.post("/signup",(req,res)=>{
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;
    var answer = req.body.answer;

    var data = {
        "name":name,
        "email": email,
        "password":password,
        "answer":answer
    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record inserted successfully");
    })
    return res.redirect('index.html');
});
app.post("/results",(req,res)=>{
    var haemo = req.body.haemo;
    var chol = req.body.chol;
    var red = req.body.red;
    var yellow = req.body.yellow;

    var data = {
        "haemo":haemo,
        "chol": chol,
        "red":red,
        "yellow":yellow
    }
    db.collection('results').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record inserted successfully");
    })
});

app.get("/login",(req,res)=>{
    return res.redirect('login.html');
})
app.get("/",(req,res)=>{
    res.set({
        "Allow-access-Allow-Origin": '*'
    })
    return res.redirect('index.html');
}).listen(3000);
app.post("/login",(req,res)=>{
    try{
       const uemail = req.body.email;
       const upassword = req.body.password;
       userscollection =db.collection('users');
       userscollection.findOne({email:uemail,password:upassword},function(err,doc){
        if(err){
            throw err;
        }
        if(doc){
            console.log("Successful");
            return res.redirect('frame.html');
        } else {
            console.log("Not found ");
        }
       });
       
    }
    catch(error){
        throw error;
    }
})
console.log("Listening on port 3000");