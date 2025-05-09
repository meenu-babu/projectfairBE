const {findOneAndUpdate}=require("../Models/userSchema")
const users=require('../Models/userSchema')
const jwt=require('jsonwebtoken')



//user registration
exports.registerUser=async(req,res)=>{
    //here we write logic to resolve the request
    //extrac data send from frontend in user request
    //1)find whether the email id is alresdy registered in collection
    // 2)if found ,send response back to FE ,saying "user is already registered"
    // 3)If not found ,insert that data into DB
    console.log("Inside register user controller")
    console.log(req.body)
    const {name,email,password}=req.body;


    try{

//check whether user already registered using email
    const existingUser=await users.findOne({email:email})
    if(existingUser){
        
        res.status(409).json("Account already exist please login")
    }
    else{
        //insert that user into DB
        //console.log("currently no user found")
        const newUser=new users({
            name:name,
            email:email,
            password:password,
            github:"",
            linkedin:"",
            profile:""
        })
        await newUser.save();
        res.status(201).json(`${name} Registered Successfully`)

    }

    }
    catch(err){

        res.status(401).json('Register request failed due to ',err)

    }
    


    //sending back response to FE
    // res.status(201).json("Register request received")
}

//user login
exports.loginUser=async(req,res)=>{
    //here we write logic to login
   
    const {email,password}=req.body
    console.log("Inside login controller function",email,password);

    try{
        const existingUser=await users.findOne({email:email,password:password});
        if(existingUser){
            const token=jwt.sign({userId:existingUser._id},"supersecretkey")
        console.log('token:',token);
       
            res.status(200).json({
                user_data:existingUser,
                jwttoken:token
            })
        }
        else{
            res.status(406).json("login failed due to invalid Email or password")
        }
    }
    catch(err){
        res.status(401).json("user login failed due to:",err)
    }
    
}