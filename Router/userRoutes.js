const express=require('express');
const router=express.Router();
const {getUser,createUser,updateUser}=require("../Controller/userController");

router.get("/",async(req,res)=>{
    try{
        const response=await getUser();
        res.status(200).json({
            message: 'User get successfully',
            data: response
          });
    }
    catch(error){
        res.send(error)
    }
})

router.post("/",async(req,res)=>{
    try{
        const response=await createUser(req.body);
        res.status(200).json({
            message: 'User created successfully',
            data: response
          });
       
    }
    catch(error){
        res.send(error)
    }
})

router.patch("/:id",async(req,res)=>{
    try{
        const response=await updateUser(req.params.id,req.body);
        res.status(200).json({
            message: 'User updated successfully',
            data: response
          });
        
    }
    catch(error){
        res.send(error);
    }
})














module.exports=router;