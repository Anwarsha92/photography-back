require('dotenv').config();
const express=require('express');
const cors=require('cors');
require('./db/connection')
const router=require('./routes/router')
const server=express()
const PORT=4000 || process.env.PORT
server.use(cors());
server.use(express.json())
server.use(router)
server.use('/uploads',express.static('./uploads'))
server.listen(PORT,()=>{console.log(`server run at port ${PORT}`);})
server.get('/',(req,res)=>{
    res.send('server started')
})