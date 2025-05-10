// import controllers
const userController=require('../Controllers/userController')
const projectController=require('../Controllers/projectController')

//1) import express
const express=require('express');

// 2)create an object for class router in express
const router=new express.Router()

// 3)define path
// 3.1) user registration
router.post('/user/register',userController.registerUser)

//3.2)user login
router.post("/user/login",userController.loginUser)

//3.3 Add Project
router.post('project/add',projectController.addProject)
// 4)export router
module.exports=router;


