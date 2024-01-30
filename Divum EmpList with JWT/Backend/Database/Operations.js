const {instanceofDB} = require("../Database/Connection");

const findUser = async (data) =>{
   try {
     const con = instanceofDB();
     const result = await con.query("select * from users where email = $1",[data]);
     return result;
   } catch (error) {
    return error;
   }
}
const addUser = async (data) =>{
    try {
      const con = instanceofDB();
      const result = await con.query("insert into users (email,username,password) values ($1,$2,$3)",data);
      return result;
    } catch (error) {
        console.log(error);
     return error;
    }
 }

 const findEmployee = async (data) =>{
  try {
    const con = instanceofDB();
    const result = await con.query("select * from empdetails where email = $1",[data]);
    return result;
  } catch (error) {
   return error;
  }
}
const addEmployee = async (data) =>{
  try {
    const con = instanceofDB();
    const result = await con.query("insert into empdetails (email,fname,lname,dob,mobile,address) values ($1,$2,$3,$4,$5,$6)",data);
    return result;
  } catch (error) {
   return error;
  }
}

const displayUsers = async ()=>{
  try {
    const con = instanceofDB();
    let result =await con.query("select * from empdetails order by createddate desc limit 10");
    return result.rows;
  } catch (error) {
    return error;
  }
}

const getParticularEmployee= async (data) =>{
  try{
    const con = instanceofDB();
    let result =await con.query("select * from empdetails where email=$1",[data]);
    return result.rows;
  }catch(error){
    console.log(error);
    return error;
  }
  }

  const deleteEmployee = async (data)=>{
    try{
      const con =instanceofDB();
      const result = await con.query("delete from empdetails where email=$1",[data]);
      return result;
    }
    catch(error){
      console.log(error);
       return error;
    }
  } 

  const updateEmployee = async (data) =>{
    try{
      const con = instanceofDB();
      const result = await con.query("update empdetails set fname=$1,lname=$2,mobile=$3,dob=$4,address=$5,createddate=current_timestamp where email=$6", data);
      return result;
    }catch(error){
      return error;
    }
}

module.exports={findUser,addUser,findEmployee,addEmployee,displayUsers,getParticularEmployee,deleteEmployee,updateEmployee}