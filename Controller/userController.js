const User=require("../Model/User");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");

const getUser=async()=>{
try{
    const data=await User.query().select('id', 'phone', 'name');
    return data
}
catch(error){
    return error
}
}

const createUser=async(body)=>{
    try{
        const checkUserExist=await User.query().findOne({phone:body.phone});
        if(checkUserExist){return "user Already Exist"}
        let salt=await bcrypt.genSalt(10);
        let password=await bcrypt.hash(body.password,salt);
       const data={
        phone:body.phone,
        name:body.name,
        password:password
       }
      
      let result = await User.query().insert(data);
      let id=result.id;
      result=JSON.stringify(result);
      let token = jwt.sign(result, process.env.SECRET_KEY);
      
    const tokenUpdate=await User.query().patchAndFetchById(id,{token:token});
       return tokenUpdate;
    }
    catch(error){
        return error
    }
}


const updateUser=async(id,body)=>{
    try{
        const{password}=body;
        if(password){
            let salt=await bcrypt.genSalt(10);
            let password=await bcrypt.hash(body.password,salt);
            body={...body,password};
        }       
        let data=await User.query().patchAndFetchById(id,body);
        delete data.password;
        delete data.token;
        return data;
    }
    catch(error){
        return error
    }
}

const deleteUser=async(id)=>{
    try{
        let data=await User.query().patchAndFetchById(id,{
            is_Deleted:true
           })         
            return data
    }
    catch(error){
        return error
    }
}















module.exports={getUser,createUser,updateUser,deleteUser};
