// import controllers
const userController=require('../Controllers/userController')
const projectController=require('../Controllers/projectController')
const jwtMiddleware=require('../Middlewares/jwtMiddleWare')
const multerConfig=require('../Middlewares/multerMiddleWare')


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
router.post('/project/add',jwtMiddleware,multerConfig.single('projectImage'),projectController.addProject)

//3.4 Get home projects
router.get('/project/homeproject',projectController.getHomeProject)

//3.5 Get all project
router.get('/project/allproject',jwtMiddleware,projectController.getAllProject)


//3.6 get user projects
router.get('/project/userproject',jwtMiddleware,projectController.getUserProject)

// 4)export router
module.exports=router;


