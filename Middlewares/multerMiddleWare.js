const multer=require('multer');

//define storage
const storage=multer.diskStorage({
    //it have two keys
    // 1)destination
    // 2)file name
    destination:(req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename:(req,file,callback)=>{
        const filename=`image-${Date.now()}-${file.originalname}`
        callback(null,filename)
    }
})


//define file filter
const fileFilter=(req,file,callback)=>{
    if(file.mimetype==='image/png'||
        file.mimetype==='image/jpeg'||
        file.mimetype==='image/jpg'){
            callback(null,true)
            
        }
        else{
            callback(null,false)
            return callback(new Error('only png,jpg,jpeg files are supported'))

        }
    
}

//create multer configuration
 const multConfig=multer({
    storage,
    fileFilter
 })

 module.exports=multConfig