const Voucher=require("../Model/Voucher")
const { performance } = require('perf_hooks');
// !TODO create-voucher
const createVoucher=async(body)=>{
    try{    
        let current_date = new Date();
        let addDay = current_date.setDate(current_date.getDate() + 5);
        const expire_date=new Date(addDay);
        let createData = {
            expire_date: expire_date,
            is_deleted:false,
            is_reedem:false,
            created_at: new Date(),
            updated_at: new Date()
            };
        let data={...body,...createData};
        const result = await Voucher.query().insert(data);
        return result;
    }
    catch(error){
        return error
    }
}

// !TODO get-voucher
const getVoucher=async()=>{
    try{
        var startTime = performance.now()
        const data = await Voucher.query().where('is_Deleted',false);
        var endTime = performance.now()
        console.log(`api call time is ${endTime-startTime} milliseconds`)
        return data;
    }
    catch(error){
        return error
    }
}

// !TODO update-voucher
const updateVoucher=async(id,body)=>{
    try{
        const data=await Voucher.query().patchAndFetchById(id,body);
        return data;
    }
    catch(error){
        return error
    }
}

// !TODO delete-voucher
const deleteVoucher=async(id)=>{
    try{
        const data=await Voucher.query().patchAndFetchById(id,{is_deleted:true});
        return data;
    }
    catch(error){
        return error
    }
}

// !TODO reedem Voucher
const reedemVoucher=async(voucherId,userId)=>{
    try{
        const data=await Voucher.query().findById(voucherId);
     
        if( await isExpired(data.expire_date)){
            return {message:  "Voucher has been expired"}
           
        }
        else if(data.is_reedem==1){
            return {message: "Voucher has been used"}
        }
        else{
         let data= Voucher.query().patchAndFetchById(voucherId,{
            reedemUser: userId,
             is_reedem: true
           })         
            return data
        }
    }
    catch(error){
        return error
    }
}


const isExpired=async(expire_date)=>{
    const current_date=new Date();
    if(current_date>expire_date){
        console.log("expired")
        return true
    }else{
        return false    
    }
}
module.exports={createVoucher,getVoucher,updateVoucher,deleteVoucher,reedemVoucher};