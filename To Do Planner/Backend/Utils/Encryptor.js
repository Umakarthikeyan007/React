const bcrypt = require('bcrypt')

const compare = async (pwd,hashPassword)=>{
    try {
        const flag=await bcrypt.compare(pwd+"",hashPassword+"");
        return flag;
    } catch (error) {
        console.log(error);
        return error;
    }
}

module.exports={compare};