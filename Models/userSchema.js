// 1)import mongoose
const mongoose=require('mongoose');

// 2)create schema
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        requite:true
    },
    email:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    github:{
        type:String
    },
    linkedin:{
        type:String
    },
    profile:{
        type:String
    }


})

const users=mongoose.model('users',userSchema);
module.exports=users;
