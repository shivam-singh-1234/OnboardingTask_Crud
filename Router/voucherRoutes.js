const express=require('express');
const router=express.Router();
const knex=require("knex");
const jwt=require('jsonwebtoken');

const  {createVoucher,
        getVoucher,
        updateVoucher,
        deleteVoucher,
        reedemVoucher}=require("../Controller/voucherController");
const multer = require("multer");


const storage = multer.diskStorage({
    destination:  function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.jpg');
    }
});

const u=multer({ dest: "uploads/" })
const upload = multer({ storage: storage });

router.get("/get-voucher",async(req,res)=>{
    try{
        const response=await getVoucher();
        res.status(200).json({
            message: 'Voucher get successfully',
            data: response
          });
    }
    catch(error){res.send(error)}
})


router.post("/create-voucher",upload.fields([{ name: 'logo' }, { name: 'icon' }]),async(req,res)=>{
    try{
        let body = JSON.parse(JSON.stringify(req.body)); 
        const {code}=body;
        if(!code){
            res.sendStatus(400)
            return
        }
        let data={};
        if(req.files && "logo" in req.files){
            let logo= req.files.logo[0].path;
            data={...data,logo};
        }
        if(req.files && "icon" in req.files){
            let  icon =req.files.icon[0].path;
            data={...data,icon};
        }
        data={...data,...body};
        const response=await createVoucher(data);
        res.status(201).json({
            message: 'Voucher created successfully',
            data: response
          });  
    }
    catch(error){
        console.log("line no 63",error)
        res.send(error)}
}
)

router.patch("/update-voucher/:id",upload.fields([{ name: 'logo' }, { name: 'icon' }]),async(req,res)=>{
    try{
        const id=req.params.id;
        let body = JSON.parse(JSON.stringify(req.body));
        let data={};
        if(req.files && "logo" in req.files){
            let logo= `${req.files.logo[0].path}`;
            data={...data,logo};
        }
        if(req.files && "icon" in req.files){
            let  icon = `${req.files.icon[0].path}`;
            data={...data,icon};
        }
        data={...data,...body};
        const response=await updateVoucher(id,data);
        res.status(200).json({
            message: 'Voucher updated successfully',
            data: response
          });
    }
    catch(error){
        return error
    }
})


router.delete("/delete-voucher/:id",async(req,res)=>{
    try{
        const id=req.params.id;
        const response=await deleteVoucher(id);
        res.status(200).json({
            message: 'Voucher deleted successfully',
            data: response
          });
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
        let response=await reedemVoucher(voucherId,user.id);
        if(!response.message){
            response= {data:response,message:"voucher reedem successfully"}
        }
        res.send(response);
    }
    catch(error){
        console.log(error)
        res.send(error);
    }
})
module.exports=router;





            // ${req.protocol}://${req.headers.host}/