const {Pool} = require("pg");

let mainConnection;

const credentials={
    user:"postgres",
    host:"localhost",
    database:"NewEmpList",
    password:"123",
    port:"5432"
};

   const connect = ()=>{
    mainConnection= new Pool(credentials);
   };
   
   const getConnection=()=>{
    if(mainConnection){
       return mainConnection;
    }
    else{
       connect();
    }
    return mainConnection;
   };
   
   module.exports={
      instanceofDB:getConnection
   };