const {instanceofDB} = require("./Connection");
const {alterDataForDate} = require('../Utils/formatDate');

const getUsers = async () =>{
try{
  const con = instanceofDB();
  let result =await con.query("select email,fname,lname,mobile,dob,address from users order by createddate desc limit 10");
  result=alterDataForDate(result.rows);
  return result;
}catch(error){
  return error;
}
}

const getParticularUser = async (data) =>{
  try{
    const con = instanceofDB();
    let result =await con.query("select email,fname,lname,mobile,dob,address from users where email=$1",[data]);
    return result.rows;
  }catch(error){
    return error;
  }
  }

const updateUser = async (data) =>{
    try{
      const con = instanceofDB();
      const result = await con.query("update users set fname=$1,lname=$2,mobile=$3,dob=$4,address=$5,createddate=current_timestamp where email=$6", data);
      return result;
    }catch(error){
      return error;
    }
}

const addUser = async (data) => {
    try {
        const con = instanceofDB();
        const result = await con.query("insert into users (email,fname,lname,mobile,dob,address) values ($1,$2,$3,$4,$5,$6)", data);
        return result;
    } catch (error) {
        return error;
    }

}

const deleteUser = async (data)=>{
  try{
    const con =instanceofDB();
    const result = await con.query("delete from users where email=$1",[data]);
    return result;
  }
  catch(error){
    console.log(error);
     return error;
  }
} 

module.exports = {
    getUsers, updateUser, addUser,deleteUser,getParticularUser
}