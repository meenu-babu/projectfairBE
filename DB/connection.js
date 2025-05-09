//1)import mongoose
const mongoose=require('mongoose')

//url used to connect with mongodb atlas
const connecttionString=process.env.DATABASE_URL

//connect with mongoDB
mongoose.connect(connecttionString).then((res)=>{
    console.log("mongodb connected successfully!!!")
}).catch((err)=>{
    console.log(err)
})