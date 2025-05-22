//import dotenv
 require('dotenv').config()

 //import express
 const express=require('express');

 //import connection.js
 require('./DB/connection');

 //import cors
 const cors=require('cors')

 //3a) import router
 const router=require('./Routes/router')

 //4.create server
 const pfServer=express();

 //5.cors need to be used in pfServer
 pfServer.use(cors())

 //6.use middleware to convert json data to JS object
 pfServer.use(express.json())

 //6a) use router
 pfServer.use(router)

 //we have to export the uploads folder outside of the server to access the images
 pfServer.use('/imagefolder',express.static('./uploads'))
 //first arguement is the path,that we can use in FE to access,the folder we exported,we can give a path name as you wish
 //second  argument,which folder we have to export

 //7.define PORT
 const PORT=5000

 //8.run the server
 pfServer.listen(PORT,()=>{
    console.log(`Server is running in PORT${PORT}`)
 })

 pfServer.get('/',(req,res)=>{
    res.send("Project FAIR server is running and waiting for request")
 })