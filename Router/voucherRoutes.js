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
        let body = JSON.parse(JSON.stringify(req.body)); 
        let data={};
        if("logo" in req.files){
            let logo= `${req.protocol}://${req.headers.host}/${req.files.logo[0].path}`;
            data={...data,logo};
        }
        if("icon" in req.files){
            let  icon = `${req.protocol}://${req.headers.host}/${req.files.icon[0].path}`;
            data={...data,icon};
        }
            data={...data,...body};
        const response=await createVoucher(data);
        res.send(response)
    }
    catch(error){res.send(error)}
}
)

router.patch("/update-voucher/:id",upload.fields([{ name: 'logo' }, { name: 'icon' }]),async(req,res)=>{
    try{
        const id=req.params.id;
        let body = JSON.parse(JSON.stringify(req.body)); 
        let data={};
        if("logo" in req.files){
            let logo= `${req.protocol}://${req.headers.host}/${req.files.logo[0].path}`;
            data={...data,logo};
        }
        if("icon" in req.files){
            let  icon = `${req.protocol}://${req.headers.host}/${req.files.icon[0].path}`;
            data={...data,icon};
        }
        data={...data,...body};
        const response=await updateVoucher(id,data);
        res.send(response);
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