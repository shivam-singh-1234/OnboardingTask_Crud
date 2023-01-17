const express=require('express');
const router=express.Router();
const knex=require("knex");
const fs=require('fs');
const Voucher=require('../Model/Voucher');

const  {createVoucher,
        getVoucher,
        updateVoucher,
        deleteVoucher}=require("../Controller/voucherController");
const multer = require("multer");

const storage = multer.diskStorage({
    destination:  function (req, file, cb) {
        cb(null, 'uploads/');
    }
    ,
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg');
    }
});

const u=multer({ dest: "uploads/" })
const upload = multer({ storage: storage });

router.get("/get-voucher",async(req,res)=>{
    try{
        const response=await getVoucher();
        res.send(response);
    }
    catch(error){res.send(error)}
})


router.post("/create-voucher",upload.fields([{ name: 'logo' }, { name: 'icon' }]),async(req,res)=>{
    try{
        let host = req.hostname;
        const logoFilePath = `${req.protocol}://${req.headers.host}/${req.files.logo[0].path}`;
        const iconFilePath = `${req.protocol}://${req.headers.host}/${req.files.icon[0].path}`;
        let data={code:req.body.code,discount:req.body.discount,icon:iconFilePath,logo:logoFilePath};
        const response=await createVoucher(data);
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