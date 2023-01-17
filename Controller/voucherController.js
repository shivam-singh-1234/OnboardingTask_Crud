const Voucher=require("../Model/Voucher")

// !TODO create-voucher
const createVoucher=async(body)=>{
    try{    

        let current_date = new Date();
        let addDay = current_date.setDate(current_date.getDate() + 5);
        const expire_date=new Date(addDay);
       
        const data = {
            code: body.code,
            discount: body.discount,
            expire_date: expire_date,
            is_deleted:false,
            is_reedem:false,
            logo:body.logo,
            icon:body.icon,
            created_at: new Date(),
            updated_at: new Date()
            };
    
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
        const data = await Voucher.query();
        return data;
    }
    catch(error){
        return error
    }
}

// !TODO update-voucher
const updateVoucher=async(id,body)=>{
    try{
        const data=await Voucher.query()
        .findById(id)
        .patch(body);
        return data;
    }
    catch(error){
        return error
    }
}

// !TODO delete-voucher
const deleteVoucher=async(id)=>{
    try{
        const data=await Voucher.query()
        .patch({is_deleted:true}).findById(id);
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
     
        if(!isExpired(data.expire_date)){
            return "Voucher has been expired"
        }
        else if(data.is_reedem==1){
            return "Voucher has been used"
        }
        else{
         const data= Voucher.query().patchAndFetchById(voucherId,{
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
        return true
    }else{
        return false    
    }
}
module.exports={createVoucher,getVoucher,updateVoucher,deleteVoucher,reedemVoucher};