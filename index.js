const express = require("express");
const cors = require("cors");
const dosen = require("./routes/dosen");
const matkul = require("./routes/matkul")
const multer = require("multer");
const app = express();
var originalname = "";
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.set("view engine", "ejs");
app.use(express.static("uploads"));
require('dotenv').config();

app.use("/api/dosen", dosen);
//menggunakan seluruh route yang berada di /routes/dosen.js

app.use("/api/matkul", matkul);

let upload = multer({dest: 'uploads/'});

let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads')
    },
    filename: function(req, file, cb){
        console.log(file);
        originalname = file.originalname;
        cb(null, file.originalname)
    }
});

//destinasi folder
upload = multer({storage: storage});


//foto adalah nama parameter
app.post("/api/upload", upload.single("foto"), function(req, res){
    console.log(req.body.nama);
    res.render("index", {foto: originalname});
});

app.get("/", function(req, res){
    //res.send("Berhasil ndak ya?")
    res.render("index");
});

app.listen(process.env.PORT);
console.log(`listening port ${process.env.PORT}`);