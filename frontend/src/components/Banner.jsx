import React, {useEffect} from 'react'
import axios from 'axios';
import { useState } from 'react';
import Card from '@mui/material/Card'
import { Typography } from '@mui/material';
import {CardMedia} from '@mui/material';
import vhi from '../assets/vehiculos.jpg'
import {Button} from '@mui/material';
import { blue } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import {red} from '@mui/material/colors';

export default function Banner() {
    const [data, setData] = useState([])
    const [open, setOpen] = useState(false);
    const [id, setId] = useState(0);
    const [nombre, setNombre] = useState('')
    const [cantidad, setCantidad] = useState(0)
    const [año, setAño] = useState('')
    const [precio, setPrecio] = useState(0)
    async function Submit(){
        if(nombre != '' && cantidad != 0 && año != '' && precio != 0){
            console.log(precio, id);
            await axios.put('http://localhost:3001/inventario/'+id,{
                nombre: nombre,
                añofabrica: año,
                precio: precio,
                cantidad: cantidad
            })
            setOpen(false)
        }
        else{
            alert("complete todos los campos")
        }
    }
    async function Delete(){
        await axios.delete('http://localhost:3001/inventario/'+id)
    }
    useEffect(()=>{
        getData()
    })
    async function getData(){
        const res = await axios.get('http://localhost:3001/inventario');
        setData(res.data);
    }
  return (
    <div className='container'>
        {
            data.map(e=>(
                <Card sx={{ maxWidth: 345 }} className="card">
                    <CardMedia
                    component="img"
                    height="140"
                    image={vhi}
                    alt="green iguana"
                    />
                    <div className='body'>
                        <Typography variant="h5" color={blue[600]} style={{marginBottom: "6px"}} component="div">
                            {e.nombre}
                        </Typography>
                        <Typography variant='body2' component="div">
                            año de fabricacion: {e.añofabrica}
                        </Typography>
                        <Typography variant='body2' component="div">
                            precio: {e.valor}
                        </Typography>
                        <Typography variant='body2' component="div">
                            cantidad: {e.cantidad}
                        </Typography>
                    </div>
                    <div className='d-flex justify-content-end' style={{position: "sticky", left: "80%", marginTop: "25px"}}>
                        <Button onClick={()=>{setId(e.id), Delete()}} style={{height: "70%", marginRight: "0px"}} variant='outline'><HighlightOffIcon style={{color: "red"}}/></Button>
                       <Button onClick={()=>{setOpen(true), setId(e.id)}} variant='outline' style={{height: "70%", marginRight: "5px"}}><EditIcon style={{background: "#FFF"}}/></Button>
                       <Button style={{width: "40%", height: "70%"}} variant="outlined">Comprar</Button> 
                    </div>
                </Card>
            ))
        }
        {
            open ?
            <div className='touch'>
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
            : null
        }
    </div>
  )
}
