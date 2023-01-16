const express=require('express');
const router=express.Router();
const knex=require("knex");
const Voucher=require('../Model/Voucher');
const  {createVoucher,
        getVoucher,
        updateVoucher,
        deleteVoucher}=require("../Controller/voucherController");


router.get("/get-voucher",async(req,res)=>{
    try{
        const response=await getVoucher();
        res.send(response);
    }
    catch(error){res.send(error)}
})


router.post("/create-voucher",async(req,res)=>{
    try{
        const response=await createVoucher(req.body);
        res.send(response)
    }
    catch(error){res.send(error)}
}
)

router.patch("/update-voucher/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const body=req.body;
        const response=await updateVoucher(id,body);
        res.sendStatus(200);
    }
    catch(error){
        return error
    }
})


router.delete("/delete-voucher/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const response=await deleteVoucher(id);
        res.sendStatus(200);
    }
    catch(error){
        return error
    }
})

module.exports=router;