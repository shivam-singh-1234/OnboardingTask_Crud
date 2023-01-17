const express = require("express");
const helmet=require("helmet");
require("dotenv").config();
const app = express();
app.use(helmet());
require("./DB/connection");
app.use(express.json());
const voucherRoutes=require("./Router/voucherRoutes");
app.use('/uploads', express.static('./uploads'));

app.use("/voucher",voucherRoutes);


const Port=process.env.PORT
app.listen(Port,()=>{
    console.log(`server is listining on Port ${Port}`)
})



module.exports=app;


