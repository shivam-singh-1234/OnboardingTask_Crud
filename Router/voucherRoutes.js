const express=require('express');
const router=express.Router();
const knex=require("knex");
const jwt=require('jsonwebtoken');
const Voucher=require('../Model/Voucher');
const  {createVoucher,
        getVoucher,
        updateVoucher,
        deleteVoucher,
        reedemVoucher}=require("../Controller/voucherController");
const multer = require("multer");
const User = require('../Model/User');

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


router.patch("/reedem/:voucherId",async(req,res)=>{
    try{
        
        const voucherId=req.params.voucherId;
        const authHeader = req.headers.authorization;
        let user;
        if (authHeader) {
            const token = authHeader.split(' ')[1];
             user=jwt.verify(token,process.env.SECRET_KEY);
          }
        const response=await reedemVoucher(voucherId,user.id);
        res.send(response);
    }
    catch(error){
        res.send(error);
    }
})


module.exports=router;