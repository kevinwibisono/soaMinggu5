const express = require("express");
const cors = require("cors");
const dosen = require("./routes/dosen");
const matkul = require("./routes/matkul")
const multer = require("multer");
const app = express();
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
        cb(null, file.originalname)
    }
});

//destinasi folder
upload = multer({storage: storage});


//foto adalah nama parameter
app.post("/api/upload", upload.single("foto"), function(req, res){
    console.log(req.body.nama);
    res.send("Sukses upload");
});

app.get("/", function(req, res){
    res.render("index");
});

app.listen(process.env.DB_PORT);
console.log("listening port 3000");