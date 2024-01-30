const {instanceofDB} = require("../Database/Connection");


const addUser = async (data) => {
    try {
        const con = instanceofDB();
        const result = await con.query("insert into userlist (email,username,password) values ($1,$2,$3)", data);
        return result;
    } catch (error) {
        return error;
    }

}
const findUser = async (data) => {
    try {
        const con = instanceofDB();
        const result = await con.query('select * from userlist where email=$1',[data]);
        return result;
    } catch (error) {
        console.log(error);
        return error;
    }
}


const addTask = async (data) => {
    try {
        const con = instanceofDB();
        const result = await con.query("insert into taskdetails (task,sdate,edate,description,asignee,level,status,rca) values ($1,$2,$3,$4,$5,$6,$7,$8)", data);
        return result;
      
    } catch (error) {
        return error;
    }

}

const getAllTask = async () => {
    try{
        const con = instanceofDB();
        const result = await con.query("select * from taskdetails");
        return result;
    }catch(error){
        console.log(error);
         return error;
    }
}


module.exports={addUser,findUser,addTask,getAllTask};