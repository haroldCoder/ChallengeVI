const express = require("express");
const cors = require("cors")
const bodyParser = require("body-parser")
const morgan = require("morgan")
const mysql = require("mysql")

const app = express();

const connect = mysql.createConnection({
    host: 3036,
    user: "koderx",
    password: "2364144",
    database: "vehiculos"
})

app.use(cors())
app.use(bodyParser())
app.use(morgan())
app.use(express.json())

app.get('/inventario',(req, res)=>{
    connect.query('SELECT * FROM vehiculos', (err, result)=>{
        if(err) throw err;
        res.json(result);
    });
})

app.post('/inventario', (req, res)=>{
    const {nombre, añofabrica, precio, cantidad} = req.body;
    connect.query(`INSERT INTO vehiculos SET ?`,{nombre: nombre, añofabrica: añofabrica, valor: precio, cantidad: cantidad},(err, result)=>{
        if(err) throw err;
        console.log("vehiculo agregado");
        res.send("vehiculo agregado")
    })
})

app.delete('/inventario/:id', (req, res)=>{
    const {id} = req.params;
    connect.query(`DELETE FROM vehiculos where id = ${id}`, (err, result)=>{
        if(err) throw err;
        res.send("vehiculo eliminado");
    })
})

app.put('/inventario/:id', (req, res)=>{
    const {id} = req.params;
    const {nombre, añofabrica, precio, cantidad} = req.body;
    connect.query(`UPDATE vehiculos SET nombre = '${nombre}', añofabrica = ${añofabrica}, valor = ${precio}, cantidad = ${cantidad} WHERE id=${id}`, (err, result)=>{
        if(err) throw err;
        res.send("Informacion de vehiculo actualizada");
    })
})

app.listen(3001,()=>{
    console.log("servidor en el puerto 3001");
})