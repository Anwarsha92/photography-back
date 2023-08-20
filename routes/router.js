const express=require('express')
const userController=require('../controllers/userControllers')
const upload = require('../multerConfig/storageConfig')
const router=new express.Router()


//register
router.post('/register',userController.register)

//login
router.post('/login',userController.login)

//image upload
router.put('/image_upload/:id',upload.single('image_collection'),userController.imageUpload)



//get images at user dashboard
router.get('/get_user_details/:id',userController.getUserDetails)


router.put('/image_delete/:id',userController.deleteImage)

//update profile

router.put('/update_profile/:id',upload.single('user_profile'),userController.profileUpdate)

//get all users
router.get('/get_all_users',userController.getAllUsers)

//delete user
router.delete('/delete_user/:id',userController.deleteUser)

module.exports=router

