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
            logo:body.logo,
            icon:body.icon,
            created_at: new Date(),
            updated_at: new Date()
            };
            console.log(data)
        const result = await Voucher.query().insert(data);
        console.log(result)
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

module.exports={createVoucher,getVoucher,updateVoucher,deleteVoucher};