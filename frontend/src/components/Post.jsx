import React from 'react'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button } from '@mui/material';
import { useState } from 'react';
import axios from 'axios';

function Post() {
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState(0)
    const [año, setAño] = useState('')
    const [precio, setPrecio] = useState(0)
    async function Submit(){
        if(nombre != '' && cantidad != 0 && año != '' && precio != 0){
            console.log(precio);
            await axios.post('http://localhost:3001/inventario',{
                nombre: nombre,
                añofabrica: año,
                precio: precio,
                cantidad: cantidad
            })
        }
        else{
            alert("complete todos los campos")
        }
    }
  return (
    <div style={{width: "40%", padding: "10px"}}>
       <form style={{background: "#444", padding: "10px", color: "#FFF"}}>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Nombre del vehiculo</label>
                <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"
                 onChange={(e)=>{setNombre(e.target.value)}}
                 />
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">precio</label>
                <input type="number" class="form-control" id="exampleInputPassword1"
                 onChange={(e)=>{setPrecio(e.target.value)}}
                />
            </div>
            <div class="mb-3 w-2">
                <label class="form-check-label" for="exampleCheck1">Año de fabricacion</label>
                <input type="text" class="form-control" id="exampleCheck1"
                 onChange={(e)=>{setAño(e.target.value)}}
                />
            </div>
            <div class="mb-3 w-2">
                <label class="form-check-label" for="exampleCheck1">Cantidad</label>
                <input type="number" class="form-control" id="exampleCheck1"
                 onChange={(e)=>setCantidad(e.target.value)}
                />
            </div>
            <Button onClick={Submit} style={{position: "sticky", left: "15%", marginTop: "15px"}}><AddCircleOutlineIcon style={{fontSize: "80px"}}/></Button>
        </form>
    </div>
  )
}

export default Post