const express=require('express');
const router=express.Router();
const {getUser,createUser,updateUser,deleteUser}=require("../Controller/userController");

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
        const{phone,password}=req.body;
        if(!phone || !password){
            res.sendStatus(422);
            return
        }
        if(password==""){
            res.status(422).json({
                message:`password should not be empty`
            });
            return
        }
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
        const{id,password}=req.body;
        if(id){
            res.status(422).json({
                message:`userId can't be update`
            });
            return
        }
        if(password==""){
            res.status(422).json({
                message:`password should not be empty`
            });
            return
        }
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


router.delete("/:id",async(req,res)=>{
    try{
        const response=await deleteUser(req.params.id);
        res.status(200).json({
            message: "User deleted successfully",
            data: response
          });
    }
    catch(error){
        res.send(error);
    }
})











module.exports=router;