const express = require("express");
const router = express.Router();

const listDosen = [
    {kode : "001", nama : "Budi", tahun : 2000, gender : "L"},
    {kode : "002", nama : "Bermain", tahun : 2001, gender : "P"},
    {kode : "003", nama : "Bola", tahun : 2002, gender : "L"},
    {kode : "004", nama : "Bersama", tahun : 2000, gender : "P"},
    {kode : "005", nama : "Bima", tahun : 2004, gender : "L"}
];

//get semua dosen
router.get("/", function(req, res){
    res.send(listDosen);
});

//dosen baru dgn parameter
router.post("/", function(req, res){
    let pkode = req.body.kode;
    let pnama = req.body.nama;
    let ptahun = parseInt(req.body.tahun);
    let pgender = req.body.gender;

    const dosenBaru = {kode : pkode, nama : pnama, tahun : ptahun, gender : pgender};

    listDosen.push(dosenBaru);
    res.send(listDosen);
});

function getDosen(kode){
    for (let index = 0; index < listDosen.length; index++) {
        if(listDosen[index].kode == kode){
            return listDosen[index];
        }
    }
    return null;
}

//dapatkan 1 dosen dengan function getDOsen
router.get("/:kode", function(req, res){
    let dosen = getDosen(req.params.kode);
    if(dosen != null){
        res.send(dosen);
    }
    else{
        res.status(404).send("Dosen not found");
    }
});

module.exports = router;