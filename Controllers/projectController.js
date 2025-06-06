const projects = require('../Models/projectSchema');
const project=require('../Models/projectSchema')

//add project
exports.addProject=async(req,res)=>{
    console.log("Inside add project function in projectController")
    const userId=req.payload;
    console.log("userid",userId)
    const projectImage=req.file.filename

    //destructure remaining values  send from FE
    const {title,language,githubLink,websiteLink,overview}=req.body
    console.log("values from FE  for project")
    console.log(title,language,githubLink,websiteLink,overview);
    console.log("filename");
    console.log(projectImage)
    try{
            const  existingProject=await projects.findOne({github:githubLink});
            if(existingProject){
                res.status(406).json("project already exists.....")
            }
            else{
                console.log("project not exist")
                //import project into db
                const newProject=new projects({
                    title:title,
                    language:language,
                    github:githubLink,
                    website:websiteLink,
                    overview:overview,
                    projectImage:projectImage,
                    userId:userId
                })
                await newProject.save()
                res.status(201).json(`${title} added successfully`)
            }
            
    }
    catch(err){
        res.status(401).json("something happened")
    }
   
}

//get home project
exports.getHomeProject=async(req,res)=>{
    try{
        const homeprojects=await projects.find().limit(3);
        res.status(200).json(homeprojects)
    }
    catch(err){
        res.status(401).json("request failed")
    }
}

//get all projects
exports.getAllProject=async(req,res)=>{

    //accessing value passed in URL
    const userSearchKey=req.query.search;//this search is the variable which I given in allapi.js
    console.log("search key:",userSearchKey)
    const query={
        language:{
            $regex:userSearchKey,$options:'i'
            //2nd arguement:to avaoid case sensitivity
        }
    }


// if i want to search some project with project name or technology(language)
// const query={
//     $or:[
//              {language:{$regex:userSearchKey,$options:'i'}},
//              {title:{$regex:userSearchKey,$options:'i'}}
//         ]
//     }


    try{
        const allProject=await projects.find(query)
        res.status(200).json(allProject)
    }
    catch(err){
        res.status(401).json(err)
    }
}


//get user project
exports.getUserProject=async(req,res)=>{
    try{
        const userId=req.payload;
        const userprojects=await projects.find({userId:userId})
        res.status(200).json(userprojects)
    }
    catch(err){
        res.status(401).json(err)
    }
    }


    //update user project
    exports.updateUserProject=async(req,res)=>{
        const {id}=req.params
        const userId=req.payload
        const {title,language,githubLink,websiteLink,overview,projectImage}=req.body
        console.log("Inside update project")
        console.log(id);
        console.log(userId);
        console.log(title,language,githubLink,websiteLink,overview,projectImage)
        const uploadprojectimage=req.file?req.file.filename:projectImage
        try{
                const updateProject=await projects.findByIdAndUpdate({_id:id},{
                    title:title,
                    language:language,
                    github:githubLink,
                    website:websiteLink,
                    overview:overview,
                    projectImage:uploadprojectimage,
                    userId:userId
                },{
                    new:true   //used to define update
                })
                await updateProject.save();
                res.status(200).json(updateProject)
        }
        catch(err){
                res.status(401).json(err)
        }
    }