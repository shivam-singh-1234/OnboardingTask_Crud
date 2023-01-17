const express=require('express');
const router=express.Router();
const {getUser,createUser,updateUser}=require("../Controller/userController");






router.get("/",async(req,res)=>{
    try{
        const response=await getUser();
        res.send(response);
    }
    catch(error){
        res.send(error)
    }
})

router.post("/",async(req,res)=>{
    try{
        const response=await createUser(req.body);
        res.send(response);
    }
    catch(error){
        res.send(error)
    }
})

router.patch("/:id",async(req,res)=>{
    try{
        const response=await updateUser(req.params.id,req.body);
        res.send(response);
    }
    catch(error){
        res.send(error);
    }
})














module.exports=router;