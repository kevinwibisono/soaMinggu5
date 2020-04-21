const express = require("express");
const router = express.Router();
const mysql = require("mysql");
//const config = require("./../config");
require('dotenv').config();

const pool = mysql.createPool(
    {
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASS,
        database:process.env.DB_NAME,
        port:process.env.DB_PORT
    }
);

function getConnection(){
    return new Promise(function(resolve, reject){
        pool.getConnection(function(err, conn){
            if(err){
                reject(err);
            }
            else{
                resolve(conn);
            }
        });
    });
}

function executeQuery(conn, query){
    return new Promise(function(resolve, reject){
        conn.query(query, function(err, res){
            if(err){
                reject(err);
            }
            else{
                resolve(res);
            }
        });
    });
}

//function yang memanggil promise harus async
router.get("/", async function(req, res){
    let conn = await getConnection();
    let query = "select * from matkul";
    let result = await executeQuery(conn, query);
    conn.release();
    return res.status(200).send(result);
});

router.post("/", async function(req, res){
    let conn = await getConnection();
    let query = `insert into matkul values ('${req.body.kode}', '${req.body.nama}', "${req.body.sks}")`;
    let result = await executeQuery(conn, query);
    conn.release();
    return res.status(200).send(result);
});

router.delete("/:kode", async function(req, res){
    let conn = await getConnection();
    let query = `delete from matkul where matkul_kode='${req.body.kode}'`;
    let result = await executeQuery(conn, query);
    conn.release();
    return res.status(200).send(result);
});

module.exports = router;