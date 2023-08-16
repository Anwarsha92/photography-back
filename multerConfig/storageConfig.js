//import multer

const multer=require('multer')

//using multer, define storage

const storage=multer.diskStorage({
  destination:(req,file,callback)=>{
    callback(null,'./uploads')
  },
  filename:(req,file,callback)=>{

    const filename=`image-${Date.now()}-${file.originalname}`
    callback(null,filename)
  }
})

//filter uploading file

const fileFilter=(req,file,callback)=>{
  if(file.mimetype==='image/png' || file.mimetype==='image/jpg' || file.mimetype==='image/jpeg'){
    callback(null,true)
  }
  else{
    callback(null,false)
    return callback(new Error("Only .png, .jpg, .jpeg are allowed"))
  }
}

const upload=multer({
  storage,
  fileFilter
})

module.exports=upload