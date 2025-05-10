//add project
exports.addProject=(req,res)=>{
    console.log("Inside add project function in projectController")
    res.status(201).json("project added successfully")
}